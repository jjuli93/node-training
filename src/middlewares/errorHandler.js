const logger = require('../initializers/logger');

async function errorHandlerMiddleware(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger.error(error, ctx.method, ctx.url);
    ctx.body = { error };
    ctx.status = 400;
  }
}

module.exports = errorHandlerMiddleware;
