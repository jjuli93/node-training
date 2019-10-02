const Router = require('koa-router');
const thingsService = require('../services/things');
const { withResponseMiddleware } = require('../../lib');
const { ThingSerializer, CategorySerializer } = require('../serializers');

const router = new Router();

const thingsIndexSerializer = new ThingSerializer();

router.get(
  '/',
  withResponseMiddleware(
    thingsIndexSerializer,
    (ctx) => {
      return thingsService.all({ pageConfig: ctx.state.pageConfig, ids: ctx.query.ids });
    },
    {
      paged: true,
      defaultPageSize: 20,
    },
  ),
);

const thingsShowSerializer = new ThingSerializer({
  categorySerializer: new CategorySerializer({
    thingSerializer: new ThingSerializer(),
  }),
});

router.post(
  '/',
  withResponseMiddleware(thingsShowSerializer, (ctx) => thingsService.create(ctx.request.body)),
);

module.exports = router;
