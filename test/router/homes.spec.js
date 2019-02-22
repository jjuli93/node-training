require('../test_helper');

const request = require('supertest');
const Koa = require('koa');
const homesService = require('../../src/services/homes');
const homesRouter = require('../../src/router/homes');

describe('router/homes', () => {
  let app;
  let server;

  beforeEach(() => {
    app = new Koa();
    app.use(homesRouter.routes());
    server = app.listen();
  });

  afterEach(() => {
    server.close();
  });

  describe('/', () => {
    it('sends the expected response', async () => {
      jest.spyOn(homesService, 'getHomes').mockImplementation(() => 'homes');
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ homes: 'homes' });
    });
  });
});
