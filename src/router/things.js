const Router = require('koa-router');
const thingsService = require('../services/things');
const { thingsSerializer } = require('../serializers');
const withResponse = require('../middlewares/withResponse');

const router = new Router();

router.get('/', withResponse(thingsSerializer, () => thingsService.all()));

router.post('/', withResponse(thingsSerializer, (ctx) => thingsService.create(ctx.request.body)));

module.exports = router;
