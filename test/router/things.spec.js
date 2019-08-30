jest.mock('../../src/services/things');

const request = require('supertest');
const { initializeApp } = require('../../lib');

const thingsService = require('../../src/services/things');
const thingsRouter = require('../../src/router/things');
const { thing1, thing2 } = require('../fixtures/things');

describe('router/things', () => {
  def('app', () => initializeApp({ router: thingsRouter }));

  def('server', () => get('app').listen());

  afterEach(() => {
    get('server').close();
  });

  describe('GET /', () => {
    subject(() => request(get('server')).get('/'));

    beforeEach(() => {
      const serviceResponse = {
        results: [thing1, thing2],
        total: 2,
      };
      thingsService.all.mockImplementation(() => serviceResponse);
    });

    it('sends the expected response', async () => {
      const response = await subject();
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        things: [{ name: thing1.name }, { name: thing2.name }],
        pageData: { total: 2, page: 0, pageSize: 20 },
      });
    });
  });

  describe('POST /', () => {
    subject(() =>
      request(get('server'))
        .post('/')
        .send(get('validBody')),
    );

    describe('with valid attributes', () => {
      def('validBody', () => ({ thing: { name: 'a', category_id: 1 } }));

      beforeEach(() => {
        const serviceResponse = {
          ...thing1,
          category: { name: 'catcat', things: [thing1, thing2] },
        };
        thingsService.create.mockImplementation(() => serviceResponse);
      });

      it('sends the expected response', async () => {
        const response = await subject();
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ name: thing1.name, category: { name: 'catcat' } });
      });
    });
  });
});
