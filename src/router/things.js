const Router = require('koa-router');
const thingsService = require('../services/things');
const withResponse = require('../middlewares/withResponse');
const { ThingSerializer, CategorySerializer } = require('../serializers');

const router = new Router();

const thingsIndexSerializer = new ThingSerializer();

router.get(
  '/',
  withResponse(
    thingsIndexSerializer,
    () => thingsService.all(),
  ),
);

const thingsShowSerializer = new ThingSerializer({
  categorySerializer: new CategorySerializer({
    thingSerializer: new ThingSerializer(),
  }),
});

router.post(
  '/',
  withResponse(
    thingsShowSerializer,
    (ctx) => thingsService.create(ctx.request.body),
  ),
);

module.exports = router;
