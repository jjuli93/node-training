const { Serializer } = require('../../../lib');

class UserSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'users' });
    this.baseFields = [];
    this.meta = {};
  }
}

module.exports = UserSerializer;
