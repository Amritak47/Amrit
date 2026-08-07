const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/requireAuth');
const { serializeStudent } = require('../lib/serialize');
const { TOTAL_WEEKS, TOTAL_TERMS, DAYS } = require('../config');

const router = express.Router();

// GET /api/export/full -> everything needed to build the workbook client-side
// (with SheetJS, exactly as the design prototype did) and to render the
// Export screen's "at a glance" recorded-days grid. PIN-gated.
router.get('/full', requireAuth, (req, res) => {
  const students = db
    .prepare('SELECT * FROM students WHERE active = 1 ORDER BY sort_order ASC')
    .all()
    .map(serializeStudent);

  const rows = db.prepare('SELECT student_id, term, week, day, count FROM attendance WHERE count > 0').all();
  const attendance = {};
  rows.forEach((r) => {
    const key = `${r.term}-${r.week}-${r.day}`;
    if (!attendance[key]) attendance[key] = {};
    attendance[key][r.student_id] = r.count;
  });

  res.json({ students, attendance, totalWeeks: TOTAL_WEEKS, totalTerms: TOTAL_TERMS, days: DAYS });
});

module.exports = router;
