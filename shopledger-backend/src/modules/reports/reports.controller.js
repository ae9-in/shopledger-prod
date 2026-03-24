import { pool } from '../../config/db.js';
import { ok } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/reports/summary
export const getSummaryReport = asyncHandler(async (req, res) => {
  // Calculate various stats from isolated schema
  const { rows: custStats } = await pool.query(
    `SELECT 
       COUNT(*)::int AS customers,
       COALESCE(SUM(balance) FILTER (WHERE balance > 0), 0) AS receivable,
       COALESCE(SUM(ABS(balance)) FILTER (WHERE balance < 0), 0) AS payable
     FROM "${req.tenantSchema}".customers`
  );

  const { rows: cashStats } = await pool.query(
    `SELECT 
       COALESCE(SUM(amount) FILTER (WHERE type = 'cash_in'), 0) AS total_in,
       COALESCE(SUM(amount) FILTER (WHERE type = 'cash_out'), 0) AS total_out
     FROM "${req.tenantSchema}".cashbook`
  );

  const { rows: recentActivity } = await pool.query(
    `SELECT type, amount, entry_date as date, 'cash' as source FROM "${req.tenantSchema}".cashbook
     UNION ALL
     SELECT type, amount, txn_date as date, 'ledger' as source FROM "${req.tenantSchema}".transactions
     ORDER BY date DESC LIMIT 10`
  );

  ok(res, {
    ledger: custStats[0],
    cash: cashStats[0],
    recent: recentActivity
  });
});
