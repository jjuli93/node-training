jest.mock('../../src/lib/genres/genres.service');

const request = require('supertest');
const { initializeApp } = require('../../lib');

const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const genresService = require('../../src/lib/genres/genres.service');
const genresRouter = require('../../src/web/genres');
const { genres } = require('../fixtures/genres');

describe('genres/router', () => {
  const app = initializeApp({ router: genresRouter, errorCodeToStatusMap });
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    beforeEach(() => {
      genresService.findAll.mockImplementation(() => genres);
    });

    it('sends the expected response', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        genres: [...genres],
      });
    });
  });
});
