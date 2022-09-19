const Router = require('@koa/router');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');
const genresRouter = require('./genres');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use('/genres', genresRouter.routes());

apiRouter.use(requestLoggerMiddleware());

module.exports = apiRouter;
