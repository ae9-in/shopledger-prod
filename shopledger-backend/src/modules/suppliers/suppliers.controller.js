import { pool } from '../../config/db.js';
import { ok, fail } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/suppliers
export const listSuppliers = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { rows } = await pool.query(
    `SELECT * FROM "${req.tenantSchema}".suppliers ORDER BY name ASC`
  );
  ok(res, rows);
});

// GET /api/suppliers/stats
export const getSupplierStats = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT 
       COUNT(*)::int AS total_suppliers,
       COALESCE(SUM(balance) FILTER (WHERE balance > 0), 0) AS total_receivable,
       COALESCE(SUM(ABS(balance)) FILTER (WHERE balance < 0), 0) AS total_payable
     FROM "${req.tenantSchema}".suppliers`
  );
  ok(res, rows[0]);
});

// POST /api/suppliers
export const createSupplier = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { name, phone, email, address, initialBalance = 0 } = req.body;

  if (!name) return fail(res, 'Name is required', 400);

  const { rows } = await pool.query(
    `INSERT INTO "${req.tenantSchema}".suppliers (name, phone, email, balance)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, phone, email, initialBalance]
  );
  ok(res, rows[0], 201);
});

// GET /api/suppliers/:id
export const getSupplier = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { id } = req.params;

  const { rows } = await pool.query(
    `SELECT * FROM "${req.tenantSchema}".suppliers WHERE id = $1`,
    [id]
  );
  if (!rows.length) return fail(res, 'Supplier not found', 404);
  ok(res, rows[0]);
});

// DELETE /api/suppliers/:id
export const deleteSupplier = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { id } = req.params;

  const { rowCount } = await pool.query(
    `DELETE FROM "${req.tenantSchema}".suppliers WHERE id = $1`,
    [id]
  );
  if (!rowCount) return fail(res, 'Supplier not found', 404);
  ok(res, { message: 'Supplier deleted' });
});
