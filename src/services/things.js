const Joi = require('joi');
const { pick } = require('lodash');

const thingRepo = require('../repos/thing');
const thingValidation = require('../validations/thing');
const ValidationError = require('../validations/ValidationError');

const THING_VALID_PARAMS = ['name'];

const all = () => thingRepo.all();

const create = ({ thing }) => {
  const thingParams = pick(thing, THING_VALID_PARAMS);
  const validationResult = Joi.validate(thingParams, thingValidation);
  if (validationResult.error) { throw new ValidationError(validationResult.error.details); }

  return thingRepo.create(thingParams);
};

module.exports = { all, create };
