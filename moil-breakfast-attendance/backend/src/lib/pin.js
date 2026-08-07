const crypto = require('crypto');

// PIN hashing via scrypt (Node built-in, no extra native dependency beyond what's
// already needed for better-sqlite3). Format stored: "<saltHex>:<hashHex>".
function hashPin(pin) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(String(pin), salt, 32);
  return `${salt.toString('hex')}:${derived.toString('hex')}`;
}

function verifyPin(pin, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [saltHex, hashHex] = stored.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const derived = crypto.scryptSync(String(pin), salt, expected.length);
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

module.exports = { hashPin, verifyPin };
