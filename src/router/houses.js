const Router = require('koa-router');
const housesController = require('../controllers/houses');

const router = new Router();

router.get('/', housesController.index);

module.exports = router;
