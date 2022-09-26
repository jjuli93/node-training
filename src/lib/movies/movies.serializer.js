const { Serializer } = require('../../../lib');

class MovieSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'movies' });

    this.baseFields = [
      'id',
      'title',
      'tagline',
      'overview',
      'release_date',
      'poster_url',
      'backdrop_url',
      'imdb_id',
      'genre_id',
    ];

    this.meta = {};
  }
}

module.exports = MovieSerializer;
