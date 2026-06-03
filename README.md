# Atlas of Ancient Civilizations

An interactive full-stack history explorer that maps major ancient empires, overlays historical regions on a live Leaflet experience, and serves supporting story content from MySQL.

## Live Demo

[Open the deployed app](https://historicalmap-production-abc2.up.railway.app)

## Highlights

- Explore major ancient civilizations on an interactive world map
- Jump across regions with search-driven navigation
- Read historical notes backed by a MySQL data store
- Register and log in with hashed passwords and JWT authentication
- Keep theme and map display preferences between sessions

## Tech Stack

- Node.js
- Express
- MySQL
- Leaflet
- Vanilla JavaScript
- HTML/CSS

## Project Structure

- `app.js`: Express server bootstrap and static asset serving
- `routes/`: Authentication and historical content API routes
- `db.js`: Shared MySQL connection pool
- `public/WebPages/`: Frontend pages, styles, scripts, images, and GeoJSON assets
- `public/InsertDataInDB/`: Historical JSON seed data and import script

## Notes

- Theme and basemap preferences are stored in `localStorage`
- Authentication currently uses username-based login and JWT session tokens
- The project began as a course build and has been cleaned up into a portfolio-ready version
