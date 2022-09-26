const Router = require('@koa/router');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');
const genresRouter = require('./genres');
const moviesRouter = require('./movies');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use('/genres', genresRouter.routes());
apiRouter.use('/movies', moviesRouter.routes());

apiRouter.use(requestLoggerMiddleware());

module.exports = apiRouter;
