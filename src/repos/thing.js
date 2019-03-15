const knex = require('../initializers/knex');

const TABLE_NAME = 'things';

const all = () => knex(TABLE_NAME).select('*');

const create = async (params) => {
  const [thing] = await knex(TABLE_NAME).insert(params).returning('*');

  return thing;
};

module.exports = { all, create, TABLE_NAME };
