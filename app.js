require('dotenv').config();

const port = process.env.PORT || 8243;
const path = require('path');
const express = require('express');
const authRoutes = require('./routes/auth');
const countryInfoRoutes = require('./routes/countryInfo');

const app = express();
const staticDirectory = path.join(__dirname, 'public/WebPages');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/country', countryInfoRoutes);
app.use(express.static(staticDirectory));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticDirectory, 'index.html'));
});

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
