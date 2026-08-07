const express = require('express');
const cors = require('cors');
require('./db'); // ensures schema + seed data exist before routes touch it

const { PORT, CORS_ORIGIN } = require('./config');
const { pruneExpiredSessions } = require('./lib/sessions');

const authRoutes = require('./routes/auth');
const studentsRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance');
const reportsRoutes = require('./routes/reports');
const exportRoutes = require('./routes/exportData');
const settingsRoutes = require('./routes/settings');
const publicConfigRoutes = require('./routes/publicConfig');

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/config', publicConfigRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/settings', settingsRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

pruneExpiredSessions();
setInterval(pruneExpiredSessions, 60 * 60 * 1000).unref();

app.listen(PORT, () => {
  console.log(`Moil Breakfast Club API listening on http://localhost:${PORT}`);
});
