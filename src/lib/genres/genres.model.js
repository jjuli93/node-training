const { Model } = require('objection');

class Genre extends Model {
  static get tableName() {
    return 'genres';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = { Genre };
