require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const initializeKnex = require('./initializers/knex');
const constants = require('./constants');
const router = require('./router');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

initializeKnex();

const app = new Koa();

app.use(bodyParser());

app.use(errorHandlerMiddleware);

app.use(router.routes());

app.listen(constants.PORT);
