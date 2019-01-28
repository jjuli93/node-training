require('../test_helper');

const homesService = require('../../src/services/homes');
const knex = require('../../src/initializers/knex');

describe('services/homes', () => {
  describe('getHomes', () => {
    it('returns the list of homes', async (done) => {
      await knex('homes').insert({ name: 'a Name' });
      const homes = await homesService.getHomes();
      expect(homes.map(home => home.name)).toEqual(['a Name']);
      done();
    });
  });
});
