import { pool } from '../../config/db.js';
import { ok, fail } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/transactions
export const listTransactions = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT t.*, 
            CASE WHEN t.party_type = 'customer' THEN c.name ELSE s.name END as party_name
     FROM "${req.tenantSchema}".transactions t
     LEFT JOIN "${req.tenantSchema}".customers c ON t.party_type = 'customer' AND t.party_id = c.id
     LEFT JOIN "${req.tenantSchema}".suppliers s ON t.party_type = 'supplier' AND t.party_id = s.id
     ORDER BY t.txn_date DESC, t.created_at DESC`
  );
  ok(res, rows);
});

// POST /api/transactions
export const createTransaction = asyncHandler(async (req, res) => {
  const { party_type, party_id, type, amount, note, txn_date } = req.body;

  if (!party_type || !party_id || !type || !amount) {
    return fail(res, 'Missing required fields', 400);
  }

  // The database trigger will automatically update customer/supplier balance
  const { rows } = await pool.query(
    `INSERT INTO "${req.tenantSchema}".transactions (party_type, party_id, type, amount, note, txn_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [party_type, party_id, type, amount, note, txn_date || new Date()]
  );

  ok(res, rows[0], 201);
});
