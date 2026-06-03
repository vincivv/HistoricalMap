# Atlas of Ancient Civilizations

An interactive full-stack history explorer that overlays ancient empires on a Leaflet map and serves historical notes from a MySQL database.

## Highlights

- Interactive map overlays for major ancient empires
- Search-driven map navigation
- MySQL-backed historical story content
- User registration and login with hashed passwords and JWT authentication
- Persistent display preferences for theme and basemap mode

## Tech Stack

- Node.js
- Express
- MySQL
- Leaflet
- Vanilla JavaScript
- HTML/CSS

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=armadillo_923022045
JWT_SECRET=replace_with_a_long_random_secret
```

3. Import the base schema and seeded users:

```bash
mysql -u root -p < dump_file.sql
```

4. Create the `country_stories` table if it does not exist:

```sql
USE armadillo_923022045;

CREATE TABLE country_stories (
  country_name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (country_name, year)
);
```

5. Import the historical story content:

```bash
node public/InsertDataInDB/importHistory.js
```

6. Start the app:

```bash
npm start
```

7. Visit [http://localhost:8243](http://localhost:8243)

## Project Structure

- `app.js`: Express server setup
- `routes/`: API routes for authentication and historical content
- `db.js`: Shared MySQL connection pool
- `public/WebPages/`: Static pages, styles, scripts, and GeoJSON assets
- `public/InsertDataInDB/`: JSON seed data and import script for historical stories

## Notes

- The current API returns the latest historical entry for a selected region.
- Theme and basemap preferences are stored in `localStorage`.
- The repository was originally created for a course project and has since been cleaned up for portfolio presentation.
