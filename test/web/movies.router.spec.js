jest.mock('../../src/lib/movies/movies.service');

const request = require('supertest');
const { initializeApp } = require('../../lib');

const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const moviesService = require('../../src/lib/movies/movies.service');
const moviesRouter = require('../../src/web/movies');
const { movies } = require('../fixtures/movies');

describe('movies/router', () => {
  const app = initializeApp({ router: moviesRouter, errorCodeToStatusMap });
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    beforeEach(() => {
      moviesService.findAll.mockImplementation(() => ({ results: movies, total: 4 }));
    });

    it('sends the expected response', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        movies: [...movies],
        pageData: {
          total: 4,
          page: 0,
          pageSize: 10,
        },
      });
    });

    describe('when invalid pagination parameters are passed', () => {
      const query = { page: 'hola', pageSize: 5 };

      it('throws a validation error', async () => {
        const response = await request(server).get('/').query(query);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: { details: '"page" must be a number' },
        });
      });
    });
  });
});
