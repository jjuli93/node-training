const Router = require('koa-router');
const homesService = require('../services/homes');

const router = new Router();

router.get('/', async (ctx) => {
  const homes = await homesService.getHomes();
  ctx.body = { homes };
});

module.exports = router;
