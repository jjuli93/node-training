const knex = require('knex');
const knexfile = require('../../knexfile');
const { NODE_ENV } = require('../constants');

module.exports = knex(knexfile[NODE_ENV]);
