const logger = require('../initializers/logger');

module.exports = function withResponse(serializer, flow) {
  return async (ctx) => {
    const results = await flow(ctx);
    const serializedResults = serializer(results);
    logger.debug(serializedResults, ctx.method, ctx.url);
    ctx.body = serializedResults;
  };
};
