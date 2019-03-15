require('../knex_test_helper');

const thingsService = require('../../src/services/things');
const knex = require('../../src/initializers/knex');

describe('services/things', () => {
  describe('all', () => {
    it('returns the list of things', async (done) => {
      await knex('things').insert({ name: 'a Name' });
      const things = await thingsService.all();
      expect(things.map(thing => thing.name)).toEqual(['a Name']);
      done();
    });
  });
});
