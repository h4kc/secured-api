import request from 'supertest';
import app from './app.js';
describe('Get /greeting', () => {
    it('should respond with status 200', async () => {
      const response = await request(app).get('/greeting');
      expect(response.status).toBe(200);
    });
  });