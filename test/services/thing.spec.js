require('../knex_test_helper');

const thingsService = require('../../src/services/things');
const { knexConnection } = require('../../src/initializers/knex');

describe('services/things', () => {
  describe('all', () => {
    it('returns the list of things', async (done) => {
      await knexConnection('things').insert({ name: 'a Name' });
      const things = await thingsService.all();
      expect(things).toMatchObject([{ name: 'a Name' }]);
      done();
    });
  });
});
