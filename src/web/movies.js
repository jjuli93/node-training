const Router = require('@koa/router');
const { withResponseMiddleware } = require('../../lib');
const { findAll, find, MovieSerializer } = require('../lib/movies');

const moviesRouter = new Router();

moviesRouter.get(
  '/',
  withResponseMiddleware(
    new MovieSerializer(),
    (ctx) => findAll({ pageConfig: ctx.state.pageConfig, ...ctx.request.query }),
    {
      paged: true,
      defaultSize: 20,
    },
  ),
);

moviesRouter.get('/:id', async (ctx) => {
  ctx.body = await find(ctx.params.id);
});

module.exports = moviesRouter;
