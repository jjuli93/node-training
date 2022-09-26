const {
  libHelpers: { buildErrorClasses },
} = require('../../lib');

const errorsMap = buildErrorClasses([
  'BadRequest',
  'ValidationError',
  'MovieNotFound',
  'Unauthorized',
]);

module.exports = errorsMap;
