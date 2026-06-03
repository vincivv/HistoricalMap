const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/:name', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const name = decodeURIComponent(req.params.name).trim();
  const requestedYear = Number.parseInt(req.query.year, 10);
  const hasYearFilter = Number.isFinite(requestedYear);

  try {
    const sql = hasYearFilter
      ? `SELECT country_name, year, title, content
         FROM country_stories
         WHERE country_name = ?
         AND year = ?
         LIMIT 1`
      : `SELECT country_name, year, title, content
         FROM country_stories
         WHERE country_name = ?
         ORDER BY year DESC
         LIMIT 1`;

    const params = hasYearFilter
      ? [name, requestedYear]
      : [name];

    const [rows] = await pool.promise().execute(sql, params);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No history found for that region.' });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error('Country lookup error:', error);
    return res.status(500).json({ success: false, message: 'Database error.' });
  }
});

module.exports = router;
