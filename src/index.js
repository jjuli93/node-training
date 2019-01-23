require('dotenv').config();

const constants = require('./constants');

const Koa = require('koa');

const app = new Koa();

app.listen(constants.PORT);
