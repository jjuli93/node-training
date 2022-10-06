jest.mock('../../src/lib/lists/lists.service');

const request = require('supertest');
const { initializeApp } = require('../../lib');

const passportStrategies = require('../../src/passport/strategies');
const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const listsService = require('../../src/lib/lists/lists.service');

const usersRouter = require('../../src/web/users');
const { lists } = require('../fixtures/lists');
const { user1Token } = require('../fixtures/users');

describe('users/router', () => {
  const app = initializeApp({ router: usersRouter, passportStrategies, errorCodeToStatusMap });
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  describe('GET /{user_id}/lists', () => {
    beforeEach(() => {
      listsService.findUserLists.mockImplementation(() => lists);
    });

    it('sends the expected response', async () => {
      const response = await await request(server)
        .get('/1/lists')
        .set({ authorization: `Bearer ${user1Token}` });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        lists: [...lists],
      });
    });

    it('throws error when trying to access another user lists', async () => {
      const response = await request(server)
        .get('/2/lists')
        .set({ authorization: `Bearer ${user1Token}` });
      expect(response.status).toBe(403);
    });

    it('throws error when trying to access without a token', async () => {
      const response = await request(server).get('/1/lists');
      expect(response.status).toBe(401);
    });
  });
});
