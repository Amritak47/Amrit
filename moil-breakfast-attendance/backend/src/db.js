const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { DB_PATH, DEFAULT_PIN } = require('./config');
const { hashPin } = require('./lib/pin');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL DEFAULT '',
    klass TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    term INTEGER NOT NULL,
    week INTEGER NOT NULL,
    day TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    UNIQUE(student_id, term, week, day)
  );

  CREATE INDEX IF NOT EXISTS idx_attendance_key ON attendance(term, week, day);

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    expires_at TEXT NOT NULL
  );
`);

// Seed the staff PIN on first run only. The roster itself starts empty on a
// fresh database — real student names go in via the Students screen (add
// one at a time, paste a list, or import an Excel file).
const pinRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('pin_hash');
if (!pinRow) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('pin_hash', hashPin(DEFAULT_PIN));
}

module.exports = db;
