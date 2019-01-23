const housesService = require('../../src/services/houses');

describe('services/houses', () => {
  describe('index', () => {
    it('returns the list of houses', () => {
      expect(housesService.getHouses()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
  });
});
