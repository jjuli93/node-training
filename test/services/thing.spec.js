const { ValidationError, CategoryNotFound } = require('../../src/errors');
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

    describe('when the params pass validations', () => {
      describe('with an existing category', () => {
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

      describe('with a non-existing category', () => {
        def('categoryId', () => 123123);

        it('throws an expected error', async () => {
          expect.assertions(2);
          try {
            await subject();
          } catch (e) {
            expect(e).toMatchObject({
              message: 'Category not found',
              code: CategoryNotFound.code,
            });
            expect(JSON.parse(JSON.stringify(e))).toEqual({
              categoryId: 123123,
              details: 'No category was found with the given id',
            });
          }
        });
      });
    });

    describe('when the params do not pass validations', () => {
      def('categoryId', () => 'NaN');

      it('throws an error', async () => {
        expect.assertions(2);
        try {
          await subject();
        } catch (e) {
          expect(e).toMatchObject({
            message: 'ValidationError',
            code: ValidationError.code,
          });
          expect(JSON.parse(JSON.stringify(e))).toEqual({
            details: [
              {
                context: {
                  key: 'category_id',
                  label: 'category_id',
                  value: 'NaN',
                },
                message: '"category_id" must be a number',
                path: ['category_id'],
                type: 'number.base',
              },
            ],
          });
        }
      });
    });
  });
});
