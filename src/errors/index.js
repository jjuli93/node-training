const {
  libHelpers: { buildErrorClasses },
} = require('../../lib');

const errorsMap = buildErrorClasses([
  'BadRequest',
  'ValidationError',
  'MovieNotFound',
  'UserNotFound',
  'Unauthorized',
]);

module.exports = errorsMap;
