const { Serializer } = require('../../../lib');

class ListSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'lists' });

    this.baseFields = [];

    this.meta = {};
  }
}

module.exports = ListSerializer;
