require('dotenv').config();

const Koa = require('koa');
const constants = require('./constants');

const app = new Koa();

app.listen(constants.PORT);
