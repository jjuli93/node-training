const request = require('supertest');
const Koa = require('koa');
const housesService = require('../../src/services/houses');
const housesRouter = require('../../src/router/houses');

describe('router/houses', () => {
  let app;
  let server;

  beforeEach(() => {
    app = new Koa();
    app.use(housesRouter.routes());
    server = app.listen(3000);
  });

  afterEach(() => {
    server.close();
  });

  it('sends the expected response', async () => {
    jest.spyOn(housesService, 'getHouses').mockImplementation(() => 'houses');
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ houses: 'houses' });
  });
});
