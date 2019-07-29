const { logger } = require('../initializers/logger');

module.exports = function withResponseMiddleware(serializer, flow) {
  return async (ctx) => {
    const results = await flow(ctx);
    const serializedResults = serializer.serialize(results);
    logger.debug(serializedResults, ctx.method, ctx.url);
    ctx.body = serializedResults;
  };
};
