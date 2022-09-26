const { BadRequest, ValidationError, MovieNotFound, Unauthorized } = require('../errors');

const errorCodeToStatusMap = {
  [BadRequest.code]: 400,
  [ValidationError.code]: 400,
  [MovieNotFound.code]: 404,
  [Unauthorized.code]: 401,
};

module.exports = errorCodeToStatusMap;
