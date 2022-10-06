const { List } = require('./lists.model');
const ListSerializer = require('./lists.serializer');
const listsService = require('./lists.service');

module.exports = {
  List,
  ListSerializer,
  ...listsService,
};
