const {
  BadRequest,
  ValidationError,
  MovieNotFound,
  Unauthorized,
  UserNotFound,
  Forbidden,
  ListNotFound,
} = require('../errors');

const errorCodeToStatusMap = {
  [BadRequest.code]: 400,
  [ValidationError.code]: 400,
  [MovieNotFound.code]: 404,
  [UserNotFound.code]: 404,
  [ListNotFound.code]: 404,
  [Unauthorized.code]: 401,
  [Forbidden.code]: 403,
};

module.exports = errorCodeToStatusMap;
