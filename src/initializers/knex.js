const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('../../knexfile');
const { NODE_ENV } = require('../constants');

const knexConnection = knex(knexfile[NODE_ENV]);
Model.knex(knexConnection);

module.exports = {
  Model,
  knexConnection,
};
