const knexCleaner = require('knex-cleaner');
const knex = require('../src/initializers/knex');
const logger = require('../src/initializers/logger');

logger.level = 'silent';

beforeEach(async () => {
  await knexCleaner.clean(knex);
});

afterAll(async () => {
  await knex.destroy();
});
