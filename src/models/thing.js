const { Model } = require('objection');

class Thing extends Model {
  static get tableName() {
    return 'things';
  }
}

module.exports = { Thing };
