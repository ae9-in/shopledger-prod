import { authService } from './auth.service.js';
import { ok, fail }    from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const COOKIE_OPTS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge:   7 * 24 * 60 * 60 * 1000,
};

export const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  ok(res, data, 201);
});

export const login = asyncHandler(async (req, res) => {
  const ip        = req.ip;
  const userAgent = req.headers['user-agent'];
  const data      = await authService.login(req.body, ip, userAgent);
  res.cookie('refreshToken', data.refreshToken, COOKIE_OPTS);
  ok(res, { accessToken: data.accessToken, shop: data.shop });
});

export const refresh = asyncHandler(async (req, res) => {
  const raw = req.cookies?.refreshToken;
  if (!raw) return fail(res, 'No refresh token', 401);
  const data = await authService.refresh(raw, req.ip, req.headers['user-agent']);
  res.cookie('refreshToken', data.refreshToken, COOKIE_OPTS);
  ok(res, { accessToken: data.accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  const raw = req.cookies?.refreshToken;
  if (raw) await authService.logout(raw);
  res.clearCookie('refreshToken');
  ok(res, { message: 'Logged out successfully' });
});

export const changePassword = asyncHandler(async (req, res) => {
  const data = await authService.changePassword(req.shop.id, req.body);
  ok(res, data);
});
