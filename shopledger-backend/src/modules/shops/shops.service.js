import { pool } from '../../config/db.js';

export const shopsService = {
  async getProfile(shopId) {
    const { rows } = await pool.query(
      `SELECT id, name, owner_email as email, phone, status, currency, date_format, created_at 
       FROM public.shops WHERE id = $1`,
      [shopId]
    );
    if (!rows.length) throw { status: 404, message: 'Shop not found' };
    return rows[0];
  },

  async updateProfile(shopId, { name, email, phone, currency, date_format }) {
    // Check if email is already taken by another shop
    if (email) {
      const { rows: existing } = await pool.query(
        `SELECT id FROM public.shops WHERE owner_email = $1 AND id != $2`,
        [email, shopId]
      );
      if (existing.length) throw { status: 409, message: 'Email already in use' };
    }

    const { rows } = await pool.query(
      `UPDATE public.shops 
       SET 
         name = COALESCE($1, name),
         owner_email = COALESCE($2, owner_email),
         phone = COALESCE($3, phone),
         currency = COALESCE($4, currency),
         date_format = COALESCE($5, date_format)
       WHERE id = $6
       RETURNING id, name, owner_email as email, phone, currency, date_format`,
      [name, email, phone, currency, date_format, shopId]
    );

    return rows[0];
  },

  async deleteShop(shopId, confirmName) {
    const { rows } = await pool.query(
      `SELECT name FROM public.shops WHERE id = $1`, [shopId]
    );
    if (!rows.length) throw { status: 404, message: 'Shop not found' };
    
    if (rows[0].name !== confirmName) {
      throw { status: 400, message: 'Confirmation shop name does not match' };
    }

    // In a real multi-tenant app, we should also drop the schema or mark it for deletion
    // For now, CASCADE will handle public.shops linked data (refresh tokens, etc)
    // Tenant schema deletion would require additional logic.
    await pool.query(`DELETE FROM public.shops WHERE id = $1`, [shopId]);

    return { message: 'Shop deleted successfully' };
  },

  async getSessions(shopId) {
    const { rows } = await pool.query(
      `SELECT id, ip_address, user_agent, created_at, expires_at 
       FROM public.refresh_tokens 
       WHERE shop_id = $1 AND revoked = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC`,
      [shopId]
    );
    return rows;
  },

  async revokeSession(shopId, sessionId) {
    await pool.query(
      `UPDATE public.refresh_tokens SET revoked = TRUE 
       WHERE id = $1 AND shop_id = $2`,
      [sessionId, shopId]
    );
    return { message: 'Session revoked' };
  }
};
