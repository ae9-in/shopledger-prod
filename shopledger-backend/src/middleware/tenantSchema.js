export function tenantSchema(req, res, next) {
  const rawId = req.shop?.id || req.headers['x-tenant-id'];
  if (!rawId) {
    return res.status(400).json({ success: false, error: 'Tenant context missing' });
  }

  const safe = String(rawId).replace(/[^a-zA-Z0-9_]/g, '');
  req.tenantSchema = `tenant_${safe}`;
  console.log(`[Tenant Context] Shop: ${rawId} -> Schema: ${req.tenantSchema}`);
  next();
}
