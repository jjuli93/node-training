const thingsService = require('../../src/services/things');
const { knexConnection } = require('../knexTestHelper');

describe('services/things', () => {
  let category;

  beforeEach(async () => {
    [category] = await knexConnection('categories')
      .insert({ name: 'a Category' })
      .returning('*');
  });

  describe('all', () => {
    subject(() => thingsService.all());

    it('returns the list of things', async () => {
      await knexConnection('things').insert({ category_id: category.id, name: 'a Name' });
      const things = await subject();
      expect(things).toMatchObject([{ name: 'a Name', category: { name: 'a Category' } }]);
    });
  });

  describe('create', () => {
    const thingData = { name: 'some thing' };

    subject(() =>
      thingsService.create({
        thing: {
          ...thingData,
          category_id: get('categoryId'),
        },
      }),
    );

    describe('with a valid category', () => {
      def('categoryId', () => category.id);

      it('creates a new thing', async () => {
        await subject();
        const thing = await knexConnection.first('*').from('things');
        expect(thing).toMatchObject({ name: thingData.name });
      });

      it('returns the newly created thing', async () => {
        const result = await subject();
        expect(result).toMatchObject({ name: thingData.name });
      });
    });

    describe('with an invalid category', () => {
      def('categoryId', () => 123123);

      it('throws an error', async () => {
        expect.assertions(1);
        try {
          await subject();
        } catch (e) {
          expect(e).toMatchObject({
            message: expect.stringContaining('violates foreign key constraint'),
          });
        }
      });
    });
  });
});
