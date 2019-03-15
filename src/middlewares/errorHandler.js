const logger = require('../initializers/logger');

async function errorHandlerMiddleware(ctx, next) {
  try {
    await next();
    logger.info(ctx.body, ctx.method, ctx.url);
  } catch (error) {
    logger.error(error, ctx.method, ctx.url);
    ctx.body = { error };
    ctx.status = 400;
  }
}

module.exports = errorHandlerMiddleware;
