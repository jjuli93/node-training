const Router = require('@koa/router');
const { findAll } = require('../lib/genres');

const genresRouter = new Router();

genresRouter.get('/', async (ctx) => {
  const genres = await findAll();
  ctx.body = {
    genres,
  };
});

module.exports = genresRouter;
