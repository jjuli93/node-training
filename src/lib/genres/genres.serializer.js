const { Serializer } = require('../../../lib');

class GenreSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'genres' });

    this.baseFields = [];

    this.meta = {};
  }
}

module.exports = GenreSerializer;
