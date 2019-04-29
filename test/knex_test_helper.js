require('./test_helper');

const knexCleaner = require('knex-cleaner');
const { knexConnection } = require('../src/initializers/knex')();

beforeEach(() => knexCleaner.clean(knexConnection, { ignoreTables: ['knex_migrations'] }));

afterAll(() => knexConnection.destroy());
