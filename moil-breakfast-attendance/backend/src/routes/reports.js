const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/requireAuth');
const { DAYS, TOTAL_TERMS, TOTAL_WEEKS } = require('../config');

const router = express.Router();

// GET /api/reports?term=1 -> week-by-week + term total breakdown, PIN-gated.
router.get('/', requireAuth, (req, res) => {
  const term = Number(req.query.term);
  if (!Number.isInteger(term) || term < 1 || term > TOTAL_TERMS) {
    return res.status(400).json({ error: 'Invalid term.' });
  }

  const sums = db
    .prepare(
      'SELECT week, day, SUM(count) AS total FROM attendance WHERE term = ? AND count > 0 GROUP BY week, day'
    )
    .all(term);
  const byWeekDay = {};
  sums.forEach((r) => {
    byWeekDay[`${r.week}-${r.day}`] = r.total;
  });

  let termTotal = 0;
  let weeksWithData = 0;
  const rows = [];
  for (let w = 1; w <= TOTAL_WEEKS; w += 1) {
    let weekTotal = 0;
    const cells = DAYS.map((d) => {
      const v = byWeekDay[`${w}-${d}`] || 0;
      weekTotal += v;
      return v;
    });
    if (weekTotal > 0) weeksWithData += 1;
    termTotal += weekTotal;
    rows.push({ week: w, label: `W${w}`, cells, total: weekTotal });
  }

  res.json({ term, totalWeeks: TOTAL_WEEKS, rows, termTotal, weeksWithData });
});

module.exports = router;
