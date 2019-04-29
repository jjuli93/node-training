const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('../../knexfile');
const { NODE_ENV } = require('../constants');

let knexConnection;

module.exports = () => {
  if (!knexConnection) {
    knexConnection = knex(knexfile[NODE_ENV]);
    Model.knex(knexConnection);
  }

  return {
    Model,
    knexConnection,
  };
};
