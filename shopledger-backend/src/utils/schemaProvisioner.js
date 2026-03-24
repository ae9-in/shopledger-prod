import fs from 'fs';
import path from 'path';

/**
 * Provisions a new isolated schema for a shop and creates all necessary tables.
 * This implements the schema-per-tenant architecture.
 */
export async function ensureTenantSchema(pool, shopId) {
  // Generate a safe schema name: shop_ + first 12 chars of UUID (no dashes)
  const schemaName = 'shop_' + String(shopId).replace(/-/g, '').slice(0, 12);
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 1. Create the schema
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    
    // 2. Set search path to the new schema so migrations run inside it
    await client.query(`SET search_path TO "${schemaName}", public`);
    
    // 3. Load and run the tenant schema migrations
    const migrationPath = path.join(process.cwd(), 'db/migrations/002_tenant_schema.sql');
    const tenantSql = fs.readFileSync(migrationPath, 'utf8');
    
    await client.query(tenantSql);
    
    // 4. Update the shop record with the newly created schema name and status
    await client.query(
      `UPDATE public.shops SET schema_name = $1, status = 'active', approved_at = NOW() WHERE id = $2`,
      [schemaName, shopId]
    );
    
    await client.query('COMMIT');
    console.log(`Successfully provisioned schema: ${schemaName}`);
    return schemaName;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`Failed to provision schema for shop ${shopId}:`, err);
    throw err;
  } finally {
    client.release();
  }
}
