const Router = require('koa-router');
const logger = require('../initializers/logger');
const homesService = require('../services/homes');

const router = new Router();

router.get('/', async (ctx) => {
  const homes = await homesService.getHomes();

  logger.debug('homes', homes);

  ctx.body = { homes };
});

module.exports = router;
