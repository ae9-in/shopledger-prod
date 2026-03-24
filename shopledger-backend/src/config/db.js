import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const hasConnectionString = Boolean(process.env.DATABASE_URL?.trim());

const poolConfig = hasConnectionString
  ? {
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }
  : {
      host: process.env.PGHOST || '127.0.0.1',
      port: Number(process.env.PGPORT || 5432),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || process.env.POSTGRES_DB_NAME || 'shopledger',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };

export const pool = new Pool(poolConfig);

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }

  const dbInfo = hasConnectionString
    ? 'using DATABASE_URL'
    : `using PGHOST=${poolConfig.host} PGPORT=${poolConfig.port} PGDATABASE=${poolConfig.database} PGUSER=${poolConfig.user}`;

  console.log(`[src/config/db.js] PostgreSQL connected (${dbInfo})`);
  release();
});

export default pool;
