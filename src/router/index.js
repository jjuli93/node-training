const Router = require('koa-router');
const housesRouter = require('./houses');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.use('/houses', housesRouter.routes());

module.exports = apiRouter;
