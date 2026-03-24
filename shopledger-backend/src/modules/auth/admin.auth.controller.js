import bcrypt from 'bcrypt';
import { pool } from '../../config/db.js';
import { ok, fail } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

function getAccessSecret() {
  return process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
}

function signAdminToken(admin) {
  return jwt.sign(
    {
      email: admin.email,
      role: admin.role || 'admin',
    },
    getAccessSecret(),
    { subject: String(admin.id), expiresIn: '8h' }
  );
}

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return fail(res, 'Email and password are required', 400);
  }

  const { rows } = await pool.query(
    `SELECT * FROM public.admins WHERE email = $1`,
    [email]
  );

  if (!rows.length) {
    return fail(res, 'Invalid email or password', 401);
  }

  const admin = rows[0];
  const valid = await bcrypt.compare(password, admin.password_hash);

  if (!valid) {
    return fail(res, 'Invalid email or password', 401);
  }

  const accessToken = signAdminToken(admin);

  ok(res, {
    accessToken,
    admin: {
      id:    admin.id,
      email: admin.email,
      role:  admin.role,
    },
  });
});
