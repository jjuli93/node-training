const { Model } = require('../initializers/knex');

class Thing extends Model {
  static get tableName() {
    return 'things';
  }
}

module.exports = { Thing };
