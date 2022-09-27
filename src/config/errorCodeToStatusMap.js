const {
  BadRequest,
  ValidationError,
  MovieNotFound,
  Unauthorized,
  UserNotFound,
} = require('../errors');

const errorCodeToStatusMap = {
  [BadRequest.code]: 400,
  [ValidationError.code]: 400,
  [MovieNotFound.code]: 404,
  [UserNotFound.code]: 404,
  [Unauthorized.code]: 401,
};

module.exports = errorCodeToStatusMap;
