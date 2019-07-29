const { ValidationError, CategoryNotFound } = require('../errors');

const errorCodeToStatusMap = {
  [ValidationError.code]: 400,
  [CategoryNotFound.code]: 404,
};

module.exports = errorCodeToStatusMap;
