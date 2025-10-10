# timezoneFinder

A modern REST API service that converts GPS coordinates (latitude/longitude) to timezone identifiers.

## Requirements

- Node.js >= 18.0.0

## Installation

```bash
git clone https://github.com/shippeo/timezoneFinder.git
cd timezoneFinder
npm install
```

## Usage

### Start the server

```bash
npm start
```

The server will start on port 8080 by default, or use the `PORT` environment variable:

```bash
PORT=3000 npm start
```

### Development mode (with auto-reload)

```bash
npm run dev
```

## API Reference

### GET /

Converts GPS coordinates to timezone.

**Query Parameters:**
- `lat` (required): Latitude between -90 and 90
- `lon` (required): Longitude between -180 and 180
- Decimal separator: accepts both comma and dot (e.g., `3,2343` or `3.2343`)

**Examples:**
- `http://localhost:8080/?lat=50.286&lon=4.165`
- `http://localhost:8080/?lat=3,2343&lon=22,22`

**Success Response (200):**
```json
{
  "lat": 3.2343,
  "lon": 22.22,
  "timezone": "Africa/Kinshasa"
}
```

**Notes:**
- Returns `"timezone": null` if no timezone can be determined at the coordinates
- Returns HTTP 400 with error details for invalid input

**Error Response (400):**
```json
{
  "error": "Bad request",
  "message": "Valid lat (-90 to 90) and lon (-180 to 180) parameters are required"
}
```

### GET /health

Health check endpoint.

**Success Response (200):**
```json
{
  "status": "ok"
}
```

## Coordinate Examples

### France
[Europe/Paris](https://goo.gl/maps/PLFRdwktTSz) => `/?lat=50.286&lon=4.165`

### Belgium
[Europe/Brussels](https://goo.gl/maps/HtnkDeehogD2) => `/?lat=50.286&lon=4.171`

## Testing

Run the test suite:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

## Dependencies

- [express](https://expressjs.com/) - Fast, minimalist web framework
- [geo-tz](https://github.com/evansiroky/node-geo-tz) - Geographic timezone lookup

## License

ISC


