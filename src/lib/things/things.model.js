const { Model } = require('objection');

class Thing extends Model {
  static get tableName() {
    return 'things';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = { Thing };
