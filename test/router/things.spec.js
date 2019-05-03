require('../test_helper');

const request = require('supertest');
const Koa = require('koa');
const thingsService = require('../../src/services/things');
const thingsRouter = require('../../src/router/things');

describe('router/things', () => {
  let app;
  let server;

  beforeEach(() => {
    app = new Koa();
    app.use(thingsRouter.routes());
    server = app.listen();
  });

  afterEach(() => {
    server.close();
  });

  describe('/', () => {
    it('sends the expected response', async () => {
      jest.spyOn(thingsService, 'all').mockImplementation(() => []);
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ things: [] });
    });
  });
});
