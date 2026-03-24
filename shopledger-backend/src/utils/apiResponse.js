export function ok(res, data = {}, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function fail(res, error = 'Request failed', status = 400, details = null) {
  const payload = { success: false, error };
  if (details) payload.details = details;
  return res.status(status).json(payload);
}
