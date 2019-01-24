const Router = require('koa-router');
const homesRouter = require('./homes');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.use('/homes', homesRouter.routes());

module.exports = apiRouter;
