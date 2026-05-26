/**
 * ============================================================
 *  ShopLedger — Full Database Migration Script
 *  Usage:
 *    node db-migrate.mjs <NEW_DATABASE_URL>
 *
 *  Example:
 *    node db-migrate.mjs "postgresql://user:pass@host:5432/newdb"
 * ============================================================
 *
 *  What this script does:
 *  1. Connects to the SOURCE database (from your .env DATABASE_URL)
 *  2. Discovers all tenant schemas (shop_*) plus 'public'
 *  3. Runs all SQL migrations on the TARGET database to set up schema
 *  4. Copies all rows from every table in source → target
 *  5. Prints a full summary of migrated rows
 * ============================================================
 */

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load SOURCE url from .env ─────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    env[key] = val;
  }
  return env;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function log(msg)  { console.log(`  ✔  ${msg}`); }
function warn(msg) { console.warn(`  ⚠  ${msg}`); }
function head(msg) { console.log(`\n${'─'.repeat(60)}\n  ${msg}\n${'─'.repeat(60)}`); }

async function runSQL(pool, sql, label = '') {
  try {
    await pool.query(sql);
    if (label) log(label);
  } catch (err) {
    warn(`Failed [${label}]: ${err.message}`);
    throw err;
  }
}

// ── Read all migration SQL files in order ─────────────────────────────────────
function loadMigrations() {
  const migrationsDir = path.join(__dirname, 'db', 'migrations');
  return fs
    .readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort()
    .map(f => ({
      name: f,
      sql: fs.readFileSync(path.join(migrationsDir, f), 'utf-8'),
    }));
}

// ── Get all tenant schema names (schema_name in public.shops) ─────────────────
async function getTenantSchemas(pool) {
  const { rows } = await pool.query(
    `SELECT schema_name FROM public.shops WHERE schema_name IS NOT NULL`
  );
  return rows.map(r => r.schema_name);
}

// ── Get all tables in a given schema ─────────────────────────────────────────
async function getTablesInSchema(pool, schema) {
  const { rows } = await pool.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = $1 ORDER BY tablename`,
    [schema]
  );
  return rows.map(r => r.tablename);
}

// ── Copy all rows from source table → target table ────────────────────────────
async function copyTable(srcPool, tgtPool, schema, table) {
  const fullTable = `"${schema}"."${table}"`;

  // Read all rows from source
  const { rows, rowCount } = await srcPool.query(`SELECT * FROM ${fullTable}`);
  if (rowCount === 0) {
    log(`${fullTable} — 0 rows (skipped)`);
    return 0;
  }

  // Build INSERT with parameterized values
  const cols = Object.keys(rows[0]);
  const quotedCols = cols.map(c => `"${c}"`).join(', ');

  // Insert in batches of 500 to avoid huge queries
  const BATCH = 500;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const values = [];
    const placeholders = batch.map((row, ri) => {
      const rowPlaceholders = cols.map((col, ci) => {
        values.push(row[col]);
        return `$${ri * cols.length + ci + 1}`;
      });
      return `(${rowPlaceholders.join(', ')})`;
    });

    await tgtPool.query(
      `INSERT INTO ${fullTable} (${quotedCols}) VALUES ${placeholders.join(', ')} ON CONFLICT DO NOTHING`,
      values
    );
    inserted += batch.length;
  }

  log(`${fullTable} — ${inserted} row(s) migrated`);
  return inserted;
}

// ── Create tenant schema on target and apply tenant migrations ────────────────
async function setupTenantSchema(tgtPool, schemaName, tenantMigrationSQL) {
  await runSQL(tgtPool, `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`, `Schema "${schemaName}" created`);
  await runSQL(tgtPool, `SET search_path TO "${schemaName}"`, `search_path set to "${schemaName}"`);
  // Replace any bare table refs to be schema-qualified isn't needed; search_path handles it
  await runSQL(tgtPool, tenantMigrationSQL, `Tenant tables created in "${schemaName}"`);
  await runSQL(tgtPool, `SET search_path TO public`, `search_path reset to public`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const newUrl = process.argv[2];
  if (!newUrl) {
    console.error('\n  ❌  Usage: node db-migrate.mjs "<NEW_DATABASE_URL>"\n');
    process.exit(1);
  }

  const env = loadEnv();
  const sourceUrl = env.DATABASE_URL;
  if (!sourceUrl) {
    console.error('\n  ❌  DATABASE_URL not found in .env\n');
    process.exit(1);
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║         ShopLedger Database Migration Tool               ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`\n  SOURCE: ${sourceUrl.replace(/:([^@]+)@/, ':****@')}`);
  console.log(`  TARGET: ${newUrl.replace(/:([^@]+)@/, ':****@')}\n`);

  // ── Pools ─────────────────────────────────────────────────────────────────
  const srcPool = new Pool({ connectionString: sourceUrl, ssl: false });
  const tgtPool = new Pool({
    connectionString: newUrl,
    ssl: newUrl.includes('localhost') ? false : { rejectUnauthorized: false },
  });

  try {
    // ── Test connections ───────────────────────────────────────────────────
    head('Step 1/5 — Testing Connections');
    await srcPool.query('SELECT 1');
    log('Source DB connected');
    await tgtPool.query('SELECT 1');
    log('Target DB connected');

    // ── Load migrations ────────────────────────────────────────────────────
    head('Step 2/5 — Running Migrations on Target DB');
    const migrations = loadMigrations();
    const tenantMigration = migrations.find(m => m.name === '002_tenant_schema.sql');

    for (const { name, sql } of migrations) {
      // Skip tenant schema migration here; we'll apply it per-schema later
      if (name === '002_tenant_schema.sql') {
        log(`${name} — deferred (applied per tenant schema)`);
        continue;
      }
      await runSQL(tgtPool, sql, `${name} applied`);
    }

    // ── Discover tenant schemas from source ────────────────────────────────
    head('Step 3/5 — Discovering Tenant Schemas');
    const tenantSchemas = await getTenantSchemas(srcPool);
    log(`Found ${tenantSchemas.length} tenant schema(s): ${tenantSchemas.join(', ') || 'none'}`);

    // Set up each tenant schema on target
    if (tenantMigration && tenantSchemas.length > 0) {
      for (const schema of tenantSchemas) {
        await setupTenantSchema(tgtPool, schema, tenantMigration.sql);
      }
    }

    // ── Copy public schema tables ──────────────────────────────────────────
    head('Step 4/5 — Migrating Public Schema Data');

    // Order matters due to foreign key constraints
    const publicTableOrder = [
      'admins',
      'shops',
      'refresh_tokens',
      'email_otps',
      'rate_limits',
      'audit_log',
    ];

    let totalRows = 0;
    const srcPublicTables = await getTablesInSchema(srcPool, 'public');

    // First copy tables in known FK-safe order
    for (const table of publicTableOrder) {
      if (srcPublicTables.includes(table)) {
        totalRows += await copyTable(srcPool, tgtPool, 'public', table);
      }
    }
    // Then copy any remaining public tables not in the known list
    for (const table of srcPublicTables) {
      if (!publicTableOrder.includes(table)) {
        totalRows += await copyTable(srcPool, tgtPool, 'public', table);
      }
    }

    // ── Copy tenant schema tables ──────────────────────────────────────────
    head('Step 5/5 — Migrating Tenant Schema Data');
    for (const schema of tenantSchemas) {
      const tables = await getTablesInSchema(srcPool, schema);
      log(`Tenant "${schema}" has tables: ${tables.join(', ') || 'none'}`);
      // FK-safe order for tenant tables
      const tenantOrder = ['customers', 'suppliers', 'transactions', 'cashbook'];
      for (const table of tenantOrder) {
        if (tables.includes(table)) {
          totalRows += await copyTable(srcPool, tgtPool, schema, table);
        }
      }
      for (const table of tables) {
        if (!tenantOrder.includes(table)) {
          totalRows += await copyTable(srcPool, tgtPool, schema, table);
        }
      }
    }

    // ── Done ───────────────────────────────────────────────────────────────
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log(`║  ✅  Migration complete! Total rows migrated: ${String(totalRows).padEnd(11)}║`);
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    console.log('  Next step: Update DATABASE_URL in your .env to the new URL.\n');

  } catch (err) {
    console.error('\n  ❌  Migration failed:', err.message);
    process.exit(1);
  } finally {
    await srcPool.end();
    await tgtPool.end();
  }
}

main();
