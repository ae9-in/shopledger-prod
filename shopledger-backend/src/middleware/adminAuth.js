export function adminAuth(req, res, next) {
  if (!req.shop) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if ((req.shop.role || '').toLowerCase() !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }

  next();
}
