const {
  libHelpers: { buildErrorClasses },
} = require('../../lib');

const errorsMap = buildErrorClasses(['BadRequest', 'ValidationError', 'CategoryNotFound']);

module.exports = errorsMap;
