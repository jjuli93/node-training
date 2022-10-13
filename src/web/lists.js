const Router = require('@koa/router');
const { find, create, update, deleteById, addMovie, deleteMovie } = require('../lib/lists');
const moviesService = require('../lib/movies');
const jwtAuthenticator = require('../middlewares/jwtAuthenticator');
const { Forbidden, BadRequest } = require('../errors');

const listsRouter = new Router();
listsRouter.use(jwtAuthenticator);

listsRouter.post('/', async (ctx) => {
  const { id } = ctx.state.user;
  const { body: list } = ctx.request;

  ctx.body = await create({ ...list, user_id: id });
});

listsRouter.get('/:listId', async (ctx) => {
  const { id: userId } = ctx.state.user;
  const { listId } = ctx.params;

  const list = await find(listId);

  if (list.user_id !== userId && !list.public) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  ctx.body = list;
});

listsRouter.put('/:listId', async (ctx) => {
  const { id: currentUserId } = ctx.state.user;
  const { body: list } = ctx.request;
  const { listId } = ctx.params;

  const { user_id } = await find(listId);

  if (user_id !== currentUserId) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  ctx.body = await update(listId, list);
});

listsRouter.delete('/:listId', async (ctx) => {
  const { id: currentUserId } = ctx.state.user;
  const { listId } = ctx.params;

  const { user_id } = await find(listId);

  if (user_id !== currentUserId) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  await deleteById(listId);
  ctx.status = 200;
});

listsRouter.post('/:listId/movies', async (ctx) => {
  const { id: currentUserId } = ctx.state.user;
  const { listId } = ctx.params;
  const {
    body: { movieId },
  } = ctx.request;
  const list = await find(listId);

  if (!movieId) {
    throw new BadRequest({
      message: 'movieId not defined',
      details: 'movieId not defined',
    });
  }
  const movie = await moviesService.find(movieId);

  if (list.user_id !== currentUserId) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  ctx.body = await addMovie(listId, movie);
});

listsRouter.delete('/:listId/movies/:movieId', async (ctx) => {
  const { id: currentUserId } = ctx.state.user;
  const { listId, movieId } = ctx.params;
  const list = await find(listId);

  if (list.user_id !== currentUserId) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  await deleteMovie(listId, movieId);
  ctx.body = 200;
});

module.exports = listsRouter;
