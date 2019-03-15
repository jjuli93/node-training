require('./test_helper');

const knexCleaner = require('knex-cleaner');
const knex = require('../src/initializers/knex');

beforeEach(() => knexCleaner.clean(knex, { ignoreTables: ['knex_migrations'] }));

afterAll(() => knex.destroy());
