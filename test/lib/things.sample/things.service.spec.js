const { ValidationError, CategoryNotFound } = require('../../../src/errors');
const thingsService = require('../../../src/lib/things.sample/things.service');
const { knexConnection } = require('../../knexTestHelper');

describe('things/service', () => {
  let category;

  beforeEach(async () => {
    [category] = await knexConnection('categories').insert({ name: 'a Category' }).returning('*');
  });

  describe('all', () => {
    beforeEach(async () => {
      const thingsToInsert = [
        { category_id: category.id, name: 'a Name 1', active: true },
        { category_id: category.id, name: 'Inacti 1', active: false },
        { category_id: category.id, name: 'a Name 2', active: true },
        { category_id: category.id, name: 'Inacti 2', active: false },
        { category_id: category.id, name: 'a Name 3', active: true },
        { category_id: category.id, name: 'a Name 4', active: true },
        { category_id: category.id, name: 'a Name 5', active: true },
      ];
      await knexConnection('things').insert(thingsToInsert);
    });

    describe('when not passed a page config', () => {
      const pageConfig = undefined;

      it('throws TypeError', () => {
        expect(() => thingsService.all({ pageConfig })).toThrow(
          "Cannot read properties of undefined (reading 'page')",
        );
      });
    });

    describe('when passed a page config', () => {
      describe('when getting all the things', () => {
        const pageConfig = { page: 0, pageSize: 10 };

        it('returns the list of things (ignoring inactive) and the total things count', async () => {
          const things = await thingsService.all({ pageConfig });
          expect(things).toMatchObject({
            results: [
              { name: 'a Name 1', category: { name: 'a Category' } },
              { name: 'a Name 2', category: { name: 'a Category' } },
              { name: 'a Name 3', category: { name: 'a Category' } },
              { name: 'a Name 4', category: { name: 'a Category' } },
              { name: 'a Name 5', category: { name: 'a Category' } },
            ],
            total: 5,
          });
        });
      });

      describe('when getting the first page (size 2)', () => {
        const pageConfig = { page: 0, pageSize: 2 };

        it('returns the list of things (ignoring inactive) and the total things count', async () => {
          const things = await thingsService.all({ pageConfig });
          expect(things).toMatchObject({
            results: [
              { name: 'a Name 1', category: { name: 'a Category' } },
              { name: 'a Name 2', category: { name: 'a Category' } },
            ],
            total: 5,
          });
        });
      });

      describe('when getting the second page (size 2)', () => {
        const pageConfig = { page: 1, pageSize: 2 };

        it('returns the list of things (ignoring inactive) and the total things count', async () => {
          const things = await thingsService.all({ pageConfig });
          expect(things).toMatchObject({
            results: [
              { name: 'a Name 3', category: { name: 'a Category' } },
              { name: 'a Name 4', category: { name: 'a Category' } },
            ],
            total: 5,
          });
        });
      });

      describe('when passed an array of 5 ids', () => {
        const thingsIds = [1, 2, 3, 4, 5];

        describe('and a pageSize of 10', () => {
          const pageConfig = { page: 0, pageSize: 10 };

          it('returns those things (ignoring inactive)', async () => {
            const things = await thingsService.all({ pageConfig, ids: thingsIds });
            expect(things).toMatchObject({
              results: [
                { name: 'a Name 1', category: { name: 'a Category' } },
                { name: 'a Name 2', category: { name: 'a Category' } },
                { name: 'a Name 3', category: { name: 'a Category' } },
              ],
              total: 3,
            });
          });
        });

        describe('and a pageSize of 2', () => {
          const pageConfig = { page: 0, pageSize: 2 };

          it('returns those things (ignoring inactive)', async () => {
            const things = await thingsService.all({ pageConfig, ids: thingsIds });
            expect(things).toMatchObject({
              results: [
                { name: 'a Name 1', category: { name: 'a Category' } },
                { name: 'a Name 2', category: { name: 'a Category' } },
              ],
              total: 3,
            });
          });
        });
      });
    });
  });

  describe('create', () => {
    const thingData = { name: 'some thing' };
    const createThing = (categoryId) =>
      thingsService.create({ thing: { ...thingData, category_id: categoryId } });

    describe('when the params pass validations', () => {
      describe('with an existing category', () => {
        it('creates a new thing', async () => {
          await createThing(category.id);
          const thing = await knexConnection.first('*').from('things');

          expect(thing).toMatchObject({ name: thingData.name });
        });

        it('returns the newly created thing', async () => {
          const result = await createThing(category.id);

          expect(result).toMatchObject({ name: thingData.name });
        });
      });

      describe('with a non-existing category', () => {
        const invalidCategoryId = 123123;

        it('throws an expected error', async () => {
          expect.assertions(2);
          try {
            await createThing(invalidCategoryId);
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
      it('throws an error', async () => {
        expect.assertions(2);
        try {
          await createThing('NaN');
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

    describe('when calling create with an undefined thing', () => {
      it('throws an error', async () => {
        expect.assertions(2);
        try {
          await thingsService.create({
            thing: undefined,
          });
        } catch (e) {
          expect(e).toMatchObject({
            message: 'ValidationError',
            code: ValidationError.code,
          });
          expect(JSON.parse(JSON.stringify(e))).toEqual({
            details: "expected valid 'thing' object, got undefined",
          });
        }
      });
    });
  });
});
