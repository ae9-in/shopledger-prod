import jwt from 'jsonwebtoken';

function getAccessSecret() {
  return process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, getAccessSecret());
    req.shop = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      status: payload.status,
      role: payload.role || 'shop',
    };
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}
