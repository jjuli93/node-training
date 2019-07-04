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

  describe('GET /', () => {
    it('sends the expected response', async () => {
      jest.spyOn(thingsService, 'all').mockImplementation(() => []);
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ things: [] });
    });
  });

  describe('POST /', () => {
    subject(() =>
      request(server)
        .post('/')
        .send(get('validBody')),
    );

    describe('with valid attributes', () => {
      def('validBody', () => ({ thing: { name: 'a', category_id: 1 } }));

      it('sends the expected response', async () => {
        const serviceResponse = { name: 'a', category: { things: [] } };
        jest.spyOn(thingsService, 'create').mockImplementation(() => serviceResponse);
        const response = await subject();
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({ name: 'a' }));
      });
    });
  });
});
