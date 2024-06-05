import request from 'supertest';
import app from './app.js';
describe('POST /greeting', () => {
    it('should respond with status 200', async () => {
      const response = await request(app).post('/greeting');
      expect(response.status).toBe(200);
    });
    it('should respond with status 200', async () => {
        const response = await request(app).post('/greeting');
        expect(response.status).toBe(200);
      });
  });