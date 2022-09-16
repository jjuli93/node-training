const Router = require('@koa/router');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use(requestLoggerMiddleware());

module.exports = apiRouter;
