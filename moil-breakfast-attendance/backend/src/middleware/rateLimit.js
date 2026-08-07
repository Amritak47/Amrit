// Small in-memory fixed-window rate limiter. Good enough for a single-process,
// single-school deployment; keyed by IP since the PIN endpoint has no user identity yet.
function rateLimit({ windowMs, max }) {
  const hits = new Map(); // key -> { count, resetAt }

  return (req, res, next) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;
    if (entry.count > max) {
      const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
      res.set('Retry-After', String(retryAfterSec));
      return res.status(429).json({ error: 'Too many attempts. Try again shortly.' });
    }
    next();
  };
}

module.exports = { rateLimit };
