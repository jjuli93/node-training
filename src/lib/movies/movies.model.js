const { Model } = require('objection');
const { Genre } = require('../genres');

class Movie extends Model {
  static get tableName() {
    return 'movies';
  }

  static get relationMappings() {
    return {
      genre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: 'movies.genre_id',
          to: 'genres.id',
        },
      },
    };
  }
}

module.exports = { Movie };
