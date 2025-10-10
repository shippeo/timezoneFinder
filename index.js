import { find } from 'geo-tz';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

// CORS and content-type middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization');
  res.contentType('application/json');
  next();
});

// Validate and parse coordinates
const parseCoordinate = (value) => {
  if (!value) return null;
  const parsed = parseFloat(value.replace(',', '.'));
  return isNaN(parsed) ? null : parsed;
};

const isValidLatitude = (lat) => lat !== null && lat >= -90 && lat <= 90;
const isValidLongitude = (lon) => lon !== null && lon >= -180 && lon <= 180;

app.get('/', (req, res) => {
  try {
    const lat = parseCoordinate(req.query.lat);
    const lon = parseCoordinate(req.query.lon);

    if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Valid lat (-90 to 90) and lon (-180 to 180) parameters are required'
      });
    }

    const timezones = find(lat, lon);
    const timezone = timezones.length > 0 ? timezones[0] : null;

    const response = { lat, lon, timezone };
    res.json(response);
    console.log(`Lat: ${lat} / Lon: ${lon} => ${timezone}`);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while processing your request'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(PORT, () => {
  console.log(`timezoneFinder app listening on port ${PORT}`);
});

export { app, server };

