import { pool } from '../../config/db.js';
import { ok, fail } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/customers
export const listCustomers = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { rows } = await pool.query(
    `SELECT * FROM "${req.tenantSchema}".customers ORDER BY name ASC`
  );
  ok(res, rows);
});

// GET /api/customers/stats
export const getCustomerStats = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { rows } = await pool.query(
    `SELECT 
       COUNT(*)::int AS total_customers,
       COALESCE(SUM(balance) FILTER (WHERE balance > 0), 0) AS total_receivable,
       COALESCE(SUM(ABS(balance)) FILTER (WHERE balance < 0), 0) AS total_payable
     FROM "${req.tenantSchema}".customers`
  );
  ok(res, rows[0]);
});

// POST /api/customers
export const createCustomer = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { name, phone, email, address, initialBalance = 0 } = req.body;

  if (!name) return fail(res, 'Name is required', 400);

  const { rows } = await pool.query(
    `INSERT INTO "${req.tenantSchema}".customers (name, phone, email, balance)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, phone, email, initialBalance]
  );
  ok(res, rows[0], 201);
});

// GET /api/customers/:id
export const getCustomer = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { id } = req.params;

  const { rows } = await pool.query(
    `SELECT * FROM "${req.tenantSchema}".customers WHERE id = $1`,
    [id]
  );
  if (!rows.length) return fail(res, 'Customer not found', 404);
  ok(res, rows[0]);
});

// DELETE /api/customers/:id
export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id: shopId } = req.shop;
  const { id } = req.params;

  const { rowCount } = await pool.query(
    `DELETE FROM "${req.tenantSchema}".customers WHERE id = $1`,
    [id]
  );
  if (!rowCount) return fail(res, 'Customer not found', 404);
  ok(res, { message: 'Customer deleted' });
});
