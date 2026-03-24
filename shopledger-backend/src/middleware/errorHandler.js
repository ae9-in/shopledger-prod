export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'test') {
    console.error('API error:', message);
  }

  res.status(status).json({
    success: false,
    error: message,
  });
}
