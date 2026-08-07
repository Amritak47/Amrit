const { isValidSession } = require('../lib/sessions');

function getToken(req) {
  const header = req.get('authorization') || '';
  if (header.startsWith('Bearer ')) return header.slice('Bearer '.length).trim();
  return null;
}

function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!isValidSession(token)) {
    return res.status(401).json({ error: 'Admin PIN required.' });
  }
  req.sessionToken = token;
  next();
}

module.exports = { requireAuth, getToken };
