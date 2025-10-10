import request from 'supertest';
import { app, server } from './index.js';

afterAll((done) => {
  server.close(done);
});

describe('Timezone Finder API', () => {
  describe('GET /', () => {
    it('should return timezone for valid coordinates (France)', async () => {
      const response = await request(app)
        .get('/?lat=50.286&lon=4.165')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('lat', 50.286);
      expect(response.body).toHaveProperty('lon', 4.165);
      expect(response.body).toHaveProperty('timezone', 'Europe/Paris');
    });

    it('should return timezone for valid coordinates (Belgium)', async () => {
      const response = await request(app)
        .get('/?lat=50.286&lon=4.171')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('lat', 50.286);
      expect(response.body).toHaveProperty('lon', 4.171);
      expect(response.body).toHaveProperty('timezone', 'Europe/Brussels');
    });

    it('should accept coordinates with comma decimal separator', async () => {
      const response = await request(app)
        .get('/?lat=3,2343&lon=22,22')
        .expect(200);

      expect(response.body).toHaveProperty('lat', 3.2343);
      expect(response.body).toHaveProperty('lon', 22.22);
      expect(response.body).toHaveProperty('timezone');
    });

    it('should return timezone for coordinates at 0,0 (Etc/GMT)', async () => {
      const response = await request(app)
        .get('/?lat=0&lon=0')
        .expect(200);

      expect(response.body).toHaveProperty('lat', 0);
      expect(response.body).toHaveProperty('lon', 0);
      expect(response.body).toHaveProperty('timezone');
      expect(response.body.timezone).not.toBeNull();
    });

    it('should return 400 for missing latitude', async () => {
      const response = await request(app)
        .get('/?lon=4.165')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for missing longitude', async () => {
      const response = await request(app)
        .get('/?lat=50.286')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for invalid latitude (> 90)', async () => {
      const response = await request(app)
        .get('/?lat=91&lon=4.165')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for invalid latitude (< -90)', async () => {
      const response = await request(app)
        .get('/?lat=-91&lon=4.165')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for invalid longitude (> 180)', async () => {
      const response = await request(app)
        .get('/?lat=50.286&lon=181')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for invalid longitude (< -180)', async () => {
      const response = await request(app)
        .get('/?lat=50.286&lon=-181')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for non-numeric latitude', async () => {
      const response = await request(app)
        .get('/?lat=abc&lon=4.165')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });

    it('should return 400 for non-numeric longitude', async () => {
      const response = await request(app)
        .get('/?lat=50.286&lon=xyz')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad request');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
