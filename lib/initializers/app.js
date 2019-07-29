const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandlerMiddleware = require('../middlewares/errorHandler');
const { initializeOrm } = require('./orm');

function initializeApp({ router, errorCodeToStatusMap, knexfile } = {}) {
  if (knexfile) initializeOrm({ knexfile });

  const app = new Koa();

  app.use(bodyParser());

  if (errorCodeToStatusMap) {
    app.use(errorHandlerMiddleware(errorCodeToStatusMap));
  }

  if (router) {
    app.use(router.routes());
  }

  return app;
}

module.exports = {
  initializeApp,
};
