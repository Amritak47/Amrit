const express = require('express');
const db = require('../db');
const { hashPin } = require('../lib/pin');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// PUT /api/settings/pin { pin } -> change the staff PIN. Requires an already-unlocked
// admin session (you must know the current PIN to get a session in the first place).
router.put('/pin', requireAuth, (req, res) => {
  const pin = String(req.body?.pin ?? '');
  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: 'PIN must be 4 digits.' });
  }
  db.prepare('UPDATE settings SET value = ? WHERE key = ?').run(hashPin(pin), 'pin_hash');
  res.status(204).end();
});

module.exports = router;
