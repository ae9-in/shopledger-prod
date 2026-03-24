const buckets = new Map();

export function createRateLimiter({ windowMs = 60_000, max = 60 } = {}) {
  return function rateLimit(req, res, next) {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    if (bucket.count > max) {
      return res.status(429).json({ success: false, error: 'Too many requests' });
    }

    next();
  };
}
