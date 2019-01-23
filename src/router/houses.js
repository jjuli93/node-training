const Router = require('koa-router');
const housesService = require('../services/houses');

const router = new Router();

router.get('/', (ctx) => {
  const houses = housesService.getHouses();
  ctx.body = { houses };
});

module.exports = router;
