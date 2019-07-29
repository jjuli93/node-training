require('dotenv').config();

const constants = require('./constants');

const { initializeApp } = require('../lib');

const router = require('./router');
const errorCodeToStatusMap = require('./config/errorCodeToStatusMap');
const knexfile = require('../knexfile');

const app = initializeApp({ router, errorCodeToStatusMap, knexfile });

app.listen(constants.PORT);
