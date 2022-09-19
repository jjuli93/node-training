const { Genre } = require('./genres.model');

module.exports = {
  findAll: () => Genre.query(),
};
