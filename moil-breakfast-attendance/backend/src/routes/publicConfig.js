const express = require('express');
const { TOTAL_WEEKS, TOTAL_TERMS, DAYS, CLASSES } = require('../config');

const router = express.Router();

// GET /api/config -> static app configuration the frontend needs before any
// auth (term/week/day pill counts, class list). Public, no student data.
router.get('/', (req, res) => {
  res.json({ totalWeeks: TOTAL_WEEKS, totalTerms: TOTAL_TERMS, days: DAYS, classes: CLASSES });
});

module.exports = router;
