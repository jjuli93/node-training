const knex = require('../initializers/knex');

const all = () => knex('homes').select('*');

module.exports = { all };
