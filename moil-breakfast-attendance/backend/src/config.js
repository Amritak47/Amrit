const path = require('path');

const TOTAL_WEEKS = Number(process.env.TOTAL_WEEKS || 10);
const TOTAL_TERMS = 4;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const CLASSES = ['Transition', 'Preschool', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];

module.exports = {
  PORT: Number(process.env.PORT || 4000),
  CORS_ORIGIN: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim()),
  DB_PATH: process.env.DB_PATH || path.join(__dirname, '..', 'data', 'moil.sqlite'),
  DEFAULT_PIN: process.env.DEFAULT_PIN || '0000',
  TOTAL_WEEKS,
  TOTAL_TERMS,
  DAYS,
  CLASSES,
  SESSION_TTL_MS: 12 * 60 * 60 * 1000 // 12 hours; client also drops the token on tab close (sessionStorage)
};
