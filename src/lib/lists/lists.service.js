const { List } = require('./lists.model');

module.exports = {
  findUserLists: (userId) => List.query().where('user_id', userId),
};
