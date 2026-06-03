const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();


(async() => {
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });


  const data = JSON.parse(fs.readFileSync('public/InsertDataInDB/countries_history.json', 'utf8'));

  for (const entry of data) {
    const { country_name, year, title, content } = entry;

    await pool.promise().execute(
      `INSERT INTO country_stories (country_name, year, title, content)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content)`,
      [country_name, year, title, content]
    );
    console.log(`Inserted/Updated: ${country_name} ${year}`);
  }

  const [rows] = await pool.promise().execute('SELECT country_name, year FROM country_stories');

  const jsonKeys = new Set(data.map(e => `${e.country_name}-${e.year}`));

  for (const row of rows) {
    const key = `${row.country_name}-${row.year}`;
    if (!jsonKeys.has(key)) {
      await pool.promise().execute(
        'DELETE FROM country_stories WHERE country_name = ? AND year = ?',
        [row.country_name, row.year]
      );
      console.log(`Deleted: ${row.country_name} ${row.year}`);
    }
  }

  await pool.promise().end();
}) ();
