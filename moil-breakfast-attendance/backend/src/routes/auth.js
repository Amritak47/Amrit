const express = require('express');
const db = require('../db');
const { verifyPin } = require('../lib/pin');
const { createSession, destroySession, isValidSession } = require('../lib/sessions');
const { getToken } = require('../middleware/requireAuth');
const { rateLimit } = require('../middleware/rateLimit');

const router = express.Router();

const pinAttemptLimiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 15 });

function getPinHash() {
  return db.prepare('SELECT value FROM settings WHERE key = ?').get('pin_hash').value;
}

// POST /api/auth/pin { pin } -> { token, expiresAt } on success.
// This is intentionally the one PIN-check endpoint that does NOT require
// requireAuth (it's how you get a token in the first place). It moves the
// comparison the original prototype did in the browser onto the server.
router.post('/pin', pinAttemptLimiter, (req, res) => {
  const pin = String(req.body?.pin ?? '');
  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: 'PIN must be 4 digits.' });
  }
  if (!verifyPin(pin, getPinHash())) {
    return res.status(401).json({ error: 'Incorrect PIN.' });
  }
  const { token, expiresAt } = createSession();
  res.json({ token, expiresAt });
});

// POST /api/auth/lock -> invalidate the caller's session token (if any).
router.post('/lock', (req, res) => {
  destroySession(getToken(req));
  res.status(204).end();
});

// GET /api/auth/me -> whether the bearer token is currently a valid admin session.
router.get('/me', (req, res) => {
  res.json({ unlocked: isValidSession(getToken(req)) });
});

module.exports = router;
