const Router = require('koa-router');
const thingsRouter = require('./things');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.use('/things', thingsRouter.routes());

module.exports = apiRouter;
