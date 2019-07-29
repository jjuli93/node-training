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

    it('sends the expected response', async () => {
      thingsService.all.mockImplementation(() => [thing1, thing2]);

      const response = await subject();
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        things: [{ name: thing1.name }, { name: thing2.name }],
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

      it('sends the expected response', async () => {
        const serviceResponse = {
          ...thing1,
          category: { name: 'catcat', things: [thing1, thing2] },
        };
        thingsService.create.mockImplementation(() => serviceResponse);

        const response = await subject();
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ name: thing1.name, category: { name: 'catcat' } });
      });
    });
  });
});
