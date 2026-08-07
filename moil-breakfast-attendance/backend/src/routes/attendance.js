const express = require('express');
const db = require('../db');
const { DAYS, TOTAL_TERMS, TOTAL_WEEKS } = require('../config');
const { serializeStudent } = require('../lib/serialize');

const router = express.Router();

function parseKey(query) {
  const term = Number(query.term);
  const week = Number(query.week);
  const day = String(query.day || '');
  if (!Number.isInteger(term) || term < 1 || term > TOTAL_TERMS) return null;
  if (!Number.isInteger(week) || week < 1 || week > TOTAL_WEEKS) return null;
  if (!DAYS.includes(day)) return null;
  return { term, week, day };
}

// GET /api/attendance?term=&week=&day= -> { [studentId]: count } for one day.
// Public: the Mark screen (no PIN) needs this to render who's already ticked off.
router.get('/', (req, res) => {
  const key = parseKey(req.query);
  if (!key) return res.status(400).json({ error: 'Invalid term/week/day.' });
  const rows = db
    .prepare('SELECT student_id, count FROM attendance WHERE term = ? AND week = ? AND day = ? AND count > 0')
    .all(key.term, key.week, key.day);
  const map = {};
  rows.forEach((r) => {
    map[r.student_id] = r.count;
  });
  res.json(map);
});

function upsertCount(term, week, day, studentId, count) {
  if (count <= 0) {
    db.prepare('DELETE FROM attendance WHERE term = ? AND week = ? AND day = ? AND student_id = ?').run(
      term,
      week,
      day,
      studentId
    );
    return;
  }
  db.prepare(
    `INSERT INTO attendance (student_id, term, week, day, count)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(student_id, term, week, day)
     DO UPDATE SET count = excluded.count, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`
  ).run(studentId, term, week, day, count);
}

// POST /api/attendance/toggle { term, week, day, studentId } -> cycles a single
// student's serving count 0 -> 1 -> 2 -> 3 -> 0 and returns the new count.
// Public: marking present never requires the staff PIN.
router.post('/toggle', (req, res) => {
  const key = parseKey(req.body || {});
  if (!key) return res.status(400).json({ error: 'Invalid term/week/day.' });
  const studentId = Number(req.body?.studentId);
  const student = db.prepare('SELECT id FROM students WHERE id = ?').get(studentId);
  if (!student) return res.status(404).json({ error: 'Student not found.' });

  const toggle = db.transaction(() => {
    const row = db
      .prepare('SELECT count FROM attendance WHERE term = ? AND week = ? AND day = ? AND student_id = ?')
      .get(key.term, key.week, key.day, studentId);
    const current = row?.count || 0;
    const next = current >= 3 ? 0 : current + 1;
    upsertCount(key.term, key.week, key.day, studentId, next);
    return next;
  });

  res.json({ studentId, count: toggle() });
});

// POST /api/attendance/mark-all { term, week, day } -> sets every ACTIVE student
// currently at 0 to 1. Never lowers or overwrites anyone already marked higher.
router.post('/mark-all', (req, res) => {
  const key = parseKey(req.body || {});
  if (!key) return res.status(400).json({ error: 'Invalid term/week/day.' });

  const run = db.transaction(() => {
    const activeIds = db.prepare('SELECT id FROM students WHERE active = 1').all().map((r) => r.id);
    const already = new Set(
      db
        .prepare('SELECT student_id FROM attendance WHERE term = ? AND week = ? AND day = ? AND count > 0')
        .all(key.term, key.week, key.day)
        .map((r) => r.student_id)
    );
    activeIds.forEach((id) => {
      if (!already.has(id)) upsertCount(key.term, key.week, key.day, id, 1);
    });
  });
  run();

  const rows = db
    .prepare('SELECT student_id, count FROM attendance WHERE term = ? AND week = ? AND day = ? AND count > 0')
    .all(key.term, key.week, key.day);
  const map = {};
  rows.forEach((r) => {
    map[r.student_id] = r.count;
  });
  res.json(map);
});

// POST /api/attendance/search-mark { term, week, day, query } -> marks the first
// alphabetical (by first name), active, not-yet-present student whose name contains
// the query. Mirrors the Mark screen's "type a name, press Enter" keyboard flow.
router.post('/search-mark', (req, res) => {
  const key = parseKey(req.body || {});
  if (!key) return res.status(400).json({ error: 'Invalid term/week/day.' });
  const query = String(req.body?.query || '').trim().toLowerCase();
  if (!query) return res.json({ matched: null });

  const result = db.transaction(() => {
    const already = new Set(
      db
        .prepare('SELECT student_id FROM attendance WHERE term = ? AND week = ? AND day = ? AND count > 0')
        .all(key.term, key.week, key.day)
        .map((r) => r.student_id)
    );
    const candidates = db
      .prepare('SELECT * FROM students WHERE active = 1 ORDER BY first_name ASC')
      .all()
      .filter((s) => !already.has(s.id))
      .filter((s) => `${s.first_name} ${s.last_name}`.toLowerCase().includes(query));

    if (candidates.length === 0) return null;
    const match = candidates[0];
    upsertCount(key.term, key.week, key.day, match.id, 1);
    return match;
  })();

  res.json({ matched: result ? serializeStudent(result) : null });
});

module.exports = router;
