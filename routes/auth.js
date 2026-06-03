const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

function buildToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

router.post('/register', async (req, res) => {
  const username = req.body.username?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.promise().execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    return res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'That email is already registered.' });
    }

    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Error registering user.' });
  }
});

router.post('/login', async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    const [results] = await pool.promise().execute(
      'SELECT id, username, password FROM users WHERE username = ? LIMIT 1',
      [username]
    );

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Authentication failed.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Authentication failed.' });
    }

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      token: buildToken(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving user.' });
  }
});

module.exports = router;
