const withResponseMiddleware = require('./middlewares/withResponse');

const { initializeApp } = require('./initializers/app');
const { initializeOrm } = require('./initializers/orm');
const { logger } = require('./initializers/logger');
const { Serializer } = require('./serializer');

module.exports = {
  initializeApp,
  initializeOrm,
  logger,
  Serializer,
  withResponseMiddleware,
};
