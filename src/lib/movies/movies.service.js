const { raw } = require('objection');
const { Movie } = require('./movies.model');
const { MovieNotFound, BadRequest } = require('../../errors');

module.exports = {
  findAll: ({ pageConfig: { page, pageSize }, title, order_by } = {}) => {
    const query = Movie.query().page(page, pageSize);

    if (title) {
      query.where(raw('lower("title")'), 'like', `%${title.toLowerCase()}%`);
    }

    if (order_by) {
      const VALID_ORDER_BY_PARAMS = ['title', 'release_date'];
      if (VALID_ORDER_BY_PARAMS.includes(order_by)) {
        query.orderBy(order_by);
      } else {
        throw new BadRequest({
          message: 'Order by not valid',
          details: 'Order by not valid',
        });
      }
    }

    query.then((data) => {
      console.log(data);
    });
    return query;
  },
  find: async (id) => {
    const movie = await Movie.query().findById(id);

    if (!movie) {
      throw new MovieNotFound({
        message: 'Movie not found',
        movie_id: id,
        details: 'No movie was found with the given id',
      });
    }
    return movie;
  },
};
