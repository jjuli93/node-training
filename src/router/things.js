const Router = require('koa-router');
const logger = require('../initializers/logger');
const thingsService = require('../services/things');

const router = new Router();

router.get('/', async (ctx) => {
  const things = await thingsService.all();

  logger.debug('things', things);

  ctx.body = { things };
});

router.post('/', async (ctx) => {
  const thing = await thingsService.create(ctx.request.body);

  logger.debug('things', thing);

  ctx.body = { thing };
});

module.exports = router;
