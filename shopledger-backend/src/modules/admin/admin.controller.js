import { provisionTenantSchema } from './provisionTenant.js';
import { pool } from '../../config/db.js';
import { ok, fail } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/admin/shops  — list all shops
export const listShops = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, name, owner_email, phone, status, created_at
     FROM public.shops
     ORDER BY created_at DESC`
  );
  ok(res, rows);
});

// GET /api/admin/shops/:id  — single shop detail
export const getShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT id, name, owner_email, phone, status, email_verified, created_at
     FROM public.shops WHERE id = $1`,
    [id]
  );
  if (!rows.length) return fail(res, 'Shop not found', 404);
  ok(res, rows[0]);
});

// PATCH /api/admin/shops/:id/approve
export const approveShop = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Update shop status and set schema name
    const schemaName = `tenant_${id.replace(/-/g, '')}`;
    const { rows } = await pool.query(
      `UPDATE public.shops 
       SET status = 'active', 
           schema_name = $1, 
           approved_at = NOW() 
       WHERE id = $2
       RETURNING id, name, owner_email, status`,
      [schemaName, id]
    );

    if (!rows.length) return fail(res, 'Shop not found', 404);

    // 2. Provision the tenant schema + tables
    await provisionTenantSchema(pool, schemaName);

    ok(res, { 
      ...rows[0], 
      schema_name: schemaName, 
      message: 'Shop approved and schema provisioned' 
    });
  } catch (err) {
    console.error('Approval failed:', err);
    fail(res, err.message, 500);
  }
});

// PATCH /api/admin/shops/:id/suspend
export const suspendShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `UPDATE public.shops SET status = 'suspended' WHERE id = $1
     RETURNING id, name, owner_email, status`,
    [id]
  );
  if (!rows.length) return fail(res, 'Shop not found', 404);
  ok(res, rows[0]);
});

// GET /api/admin/stats
export const getStats = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)                                            AS total,
       COUNT(*) FILTER (WHERE status = 'pending')         AS pending,
       COUNT(*) FILTER (WHERE status = 'active')          AS active,
       COUNT(*) FILTER (WHERE status = 'suspended')       AS suspended
     FROM public.shops`
  );
  ok(res, rows[0]);
});
