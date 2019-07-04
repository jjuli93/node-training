const request = require('supertest');
const Koa = require('koa');
const errorHandlerMiddleware = require('../../src/middlewares/errorHandler');

describe('errorHandlerMiddleware', () => {
  let app;
  let server;

  beforeEach(() => {
    app = new Koa();
    app.use(errorHandlerMiddleware);
  });

  afterEach(() => {
    server.close();
  });

  describe('when there is no error', () => {
    beforeEach(() => {
      app.use((ctx) => {
        ctx.status = 203;
        ctx.body = { value: 'testing' };
      });

      server = app.listen();
    });

    it('returns the expected status and response', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(203);
      expect(response.body).toEqual({ value: 'testing' });
    });
  });

  describe('when there is an error', () => {
    const error = { value: 'testing error' };

    beforeEach(() => {
      app.use(() => {
        throw error;
      });

      server = app.listen();
    });

    it('returns the expected status and response', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error });
    });
  });
});
