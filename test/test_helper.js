const knexCleaner = require('knex-cleaner');
const knex = require('../src/initializers/knex');

beforeEach(async () => {
  await knexCleaner.clean(knex);
});

afterAll(async () => {
  await knex.destroy();
});
