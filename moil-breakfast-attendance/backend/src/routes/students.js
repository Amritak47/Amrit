const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/requireAuth');
const { serializeStudent } = require('../lib/serialize');
const { CLASSES } = require('../config');

const router = express.Router();

function nextSortOrder() {
  const row = db.prepare('SELECT MAX(sort_order) AS m FROM students').get();
  return (row.m ?? -1) + 1;
}

function normalizeClass(klass) {
  const k = String(klass || '').trim();
  return CLASSES.includes(k) ? k : CLASSES[0];
}

function getStudentOr404(id, res) {
  const row = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  if (!row) {
    res.status(404).json({ error: 'Student not found.' });
    return null;
  }
  return row;
}

// GET /api/students -> full roster, ordered by roster position.
// Public: the Mark screen (no PIN) needs this to render the sign-in list.
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM students ORDER BY sort_order ASC').all();
  res.json(rows.map(serializeStudent));
});

// POST /api/students { first, last, klass } -> add a single student at the end of the roster.
router.post('/', requireAuth, (req, res) => {
  const first = String(req.body?.first || '').trim();
  const last = String(req.body?.last || '').trim();
  if (!first) return res.status(400).json({ error: 'First name is required.' });
  const klass = normalizeClass(req.body?.klass);
  const order = nextSortOrder();
  const info = db
    .prepare('INSERT INTO students (first_name, last_name, klass, active, sort_order) VALUES (?, ?, ?, 1, ?)')
    .run(first, last, klass, order);
  const row = db.prepare('SELECT * FROM students WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(serializeStudent(row));
});

// POST /api/students/bulk { entries: [{ first, last, klass }] } -> append many students at once.
// Used by both the "Paste a list" panel and the Excel import (the frontend parses
// pasted text / the workbook into { first, last, klass } entries, mirroring the
// original prototype's parsing rules, then hands the resulting array to this endpoint).
router.post('/bulk', requireAuth, (req, res) => {
  const entries = Array.isArray(req.body?.entries) ? req.body.entries : [];
  const cleaned = entries
    .map((e) => ({
      first: String(e?.first || '').trim(),
      last: String(e?.last || '').trim(),
      klass: normalizeClass(e?.klass)
    }))
    .filter((e) => e.first);
  if (cleaned.length === 0) return res.json([]);

  let order = nextSortOrder();
  const insert = db.prepare(
    'INSERT INTO students (first_name, last_name, klass, active, sort_order) VALUES (?, ?, ?, 1, ?)'
  );
  const insertMany = db.transaction((rows) => {
    const created = [];
    for (const r of rows) {
      const info = insert.run(r.first, r.last, r.klass, order);
      created.push(info.lastInsertRowid);
      order += 1;
    }
    return created;
  });
  const ids = insertMany(cleaned);
  const placeholders = ids.map(() => '?').join(',');
  const rows = db.prepare(`SELECT * FROM students WHERE id IN (${placeholders}) ORDER BY sort_order ASC`).all(...ids);
  res.status(201).json(rows.map(serializeStudent));
});

// PUT /api/students/:id { first, last, klass } -> edit a student's details.
router.put('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = getStudentOr404(id, res);
  if (!existing) return;

  const first = req.body?.first !== undefined ? String(req.body.first).trim() : existing.first_name;
  const last = req.body?.last !== undefined ? String(req.body.last).trim() : existing.last_name;
  const klass = req.body?.klass !== undefined ? normalizeClass(req.body.klass) : existing.klass;
  if (!first) return res.status(400).json({ error: 'First name is required.' });

  db.prepare(
    "UPDATE students SET first_name = ?, last_name = ?, klass = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?"
  ).run(first, last, klass, id);
  const row = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  res.json(serializeStudent(row));
});

// PATCH /api/students/:id/toggle-active -> flip active/inactive. No delete action by design.
router.patch('/:id/toggle-active', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = getStudentOr404(id, res);
  if (!existing) return;
  db.prepare(
    "UPDATE students SET active = 1 - active, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?"
  ).run(id);
  const row = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  res.json(serializeStudent(row));
});

// POST /api/students/:id/move { direction: 'up' | 'down' } -> swap position with the
// adjacent student in the FULL roster order (independent of any class filter applied
// in the UI), matching the original prototype's reorder semantics.
router.post('/:id/move', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const direction = req.body?.direction;
  if (direction !== 'up' && direction !== 'down') {
    return res.status(400).json({ error: "direction must be 'up' or 'down'." });
  }

  const move = db.transaction(() => {
    const list = db.prepare('SELECT id, sort_order FROM students ORDER BY sort_order ASC').all();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) return { notFound: true };
    const neighborIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (neighborIdx < 0 || neighborIdx >= list.length) return { noop: true };
    const cur = list[idx];
    const neighbor = list[neighborIdx];
    const update = db.prepare('UPDATE students SET sort_order = ? WHERE id = ?');
    update.run(neighbor.sort_order, cur.id);
    update.run(cur.sort_order, neighbor.id);
    return { ok: true };
  });

  const result = move();
  if (result.notFound) return res.status(404).json({ error: 'Student not found.' });

  const rows = db.prepare('SELECT * FROM students ORDER BY sort_order ASC').all();
  res.json(rows.map(serializeStudent));
});

module.exports = router;
