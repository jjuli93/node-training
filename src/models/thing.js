const { Model } = require('objection');

class Thing extends Model {
  static get tableName() {
    return 'things';
  }

  static get relationMappings() {
    const { Category } = require('./category'); //eslint-disable-line

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'things.category_id',
          to: 'categories.id',
        },
      },
    };
  }
}

module.exports = { Thing };
