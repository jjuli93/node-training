const { logger } = require('../initializers/logger');

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger.error(error, ctx.method, ctx.url);
    ctx.body = { error };
    ctx.status = 400;
  }
}

module.exports = errorHandler;
