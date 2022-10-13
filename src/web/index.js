const Router = require('@koa/router');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');
const authRouter = require('./auth');
const genresRouter = require('./genres');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const listsRouter = require('./lists');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use('/genres', genresRouter.routes());
apiRouter.use('/movies', moviesRouter.routes());
apiRouter.use('/auth', authRouter.routes());
apiRouter.use('/users', usersRouter.routes());
apiRouter.use('/lists', listsRouter.routes());

apiRouter.use(requestLoggerMiddleware());

module.exports = apiRouter;
