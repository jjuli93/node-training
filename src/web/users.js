const Router = require('@koa/router');
const { findUserLists } = require('../lib/lists/lists.service');
const { Forbidden } = require('../errors');
const jwtAuthenticator = require('../middlewares/jwtAuthenticator');

const usersRouter = new Router();
usersRouter.use(jwtAuthenticator);

usersRouter.get('/:userId/lists', async (ctx) => {
  const { userId } = ctx.params;
  const { id } = ctx.state.user;

  if (id !== parseInt(userId, 10)) {
    throw new Forbidden({ details: "You don't have permission to access this resource" });
  }

  const lists = await findUserLists(userId);
  ctx.body = {
    lists,
  };
});

module.exports = usersRouter;
