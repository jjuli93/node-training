require('dotenv').config();

const Koa = require('koa');
const constants = require('./constants');
const router = require('./router');

const app = new Koa();

app.use(router.routes());

app.listen(constants.PORT);
