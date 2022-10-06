const { Model } = require('objection');
const { Movie } = require('../movies');

class List extends Model {
  static get tableName() {
    return 'lists';
  }

  static get relationMappings() {
    return {
      genre: {
        relation: Model.ManyToManyRelation,
        modelClass: Movie,
        join: {
          from: 'lists.id',
          through: {
            from: 'lists_movies.list_id',
            to: 'lists_movies.movie_id',
          },
          to: 'movies.id',
        },
      },
    };
  }
}

module.exports = { List };
