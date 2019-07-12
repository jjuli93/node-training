const knexCleaner = require('knex-cleaner');

const { initializeOrm } = require('..');

const { knexConnection } = initializeOrm();

beforeEach(() => knexCleaner.clean(knexConnection, { ignoreTables: ['knex_migrations'] }));

afterAll(() => knexConnection.destroy());

module.exports = { knexConnection };
