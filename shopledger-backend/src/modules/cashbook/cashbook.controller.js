import { pool } from '../../config/db.js';
import { ok, fail } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/cashbook
export const listCashbook = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT * FROM "${req.tenantSchema}".cashbook ORDER BY entry_date DESC, created_at DESC`
  );
  ok(res, rows);
});

// GET /api/cashbook/stats
export const getCashbookStats = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT 
       COALESCE(SUM(amount) FILTER (WHERE type = 'cash_in'), 0) AS total_in,
       COALESCE(SUM(amount) FILTER (WHERE type = 'cash_out'), 0) AS total_out,
       COALESCE(SUM(amount) FILTER (WHERE type = 'cash_in'), 0) - COALESCE(SUM(amount) FILTER (WHERE type = 'cash_out'), 0) AS balance
     FROM "${req.tenantSchema}".cashbook`
  );
  ok(res, rows[0]);
});

// POST /api/cashbook
export const createCashbook = asyncHandler(async (req, res) => {
  const { type, category, amount, entry_date, note } = req.body;

  if (!type || !amount) return fail(res, 'Type and amount are required', 400);

  const { rows } = await pool.query(
    `INSERT INTO "${req.tenantSchema}".cashbook (type, category, amount, entry_date, note)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [type, category, amount, entry_date || new Date(), note]
  );
  ok(res, rows[0], 201);
});
