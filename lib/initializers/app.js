const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandlerMiddleware = require('../middlewares/errorHandler');
const { initializeOrm } = require('./orm');

function initializeApp({ router } = {}) {
  initializeOrm();

  const app = new Koa();

  app.use(bodyParser());
  app.use(errorHandlerMiddleware);

  if (router) {
    app.use(router.routes());
  }

  return app;
}

module.exports = {
  initializeApp,
};
