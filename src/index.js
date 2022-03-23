require('dotenv').config();

const constants = require('./constants');

const { initializeApp } = require('../lib');

const router = require('./web');
const errorCodeToStatusMap = require('./config/errorCodeToStatusMap');
const knexfile = require('../knexfile');
const passportStrategies = require('./passport/strategies');

Error.stackTraceLimit = 1000; // increase stackTraceLimit (default 10) to avoid losing the error source in the logs

const app = initializeApp({
  router,
  errorCodeToStatusMap,
  knexfile,
  passportStrategies,
});

app.listen(constants.PORT);
