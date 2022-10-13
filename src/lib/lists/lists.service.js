const { List } = require('./lists.model');
const { ListNotFound } = require('../../errors');
const { create, update } = require('./lists.validations');
const { ValidationError } = require('../../errors');

module.exports = {
  findUserLists: (userId) => List.query().where('user_id', userId),
  find: async (id) => {
    const list = await List.query().findById(id);

    if (!list) {
      throw new ListNotFound({
        message: 'list not found',
        list_id: id,
        details: 'No list was found with the given id',
      });
    }
    return list;
  },
  create: async (list) => {
    const { value, error } = create.validate(list);

    if (error) {
      throw new ValidationError({ details: error.details.map((err) => err.message) });
    }

    return List.query().insert(value).returning('*');
  },
  update: async (listId, list) => {
    const { value, error } = update.validate(list);

    if (error) {
      throw new ValidationError({ details: error.details.map((err) => err.message) });
    }

    return List.query().findById(listId).update(value).returning('*');
  },
  deleteById: async (listId) => {
    const deleted = await List.query().deleteById(listId);

    if (!deleted) {
      throw new ListNotFound({
        message: 'list not found',
        list_id: listId,
        details: 'No list was found with the given id',
      });
    }
  },
  addMovie: async (listId, movieId) => {
    const list = await List.relatedQuery('movies').for(listId).relate(movieId);

    return list;
  },
  deleteMovie: async (listId, movieId) => {
    const list = await List.relatedQuery('movies')
      .for(listId)
      .unrelate()
      .where('movies.id', '=', movieId);

    return list;
  },
};
