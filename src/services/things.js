const Joi = require('joi');
const { pick } = require('lodash');

const { Thing } = require('../models/thing');
const thingValidation = require('../validations/thing');
const ValidationError = require('../validations/ValidationError');

const THING_VALID_PARAMS = ['name', 'category_id'];

const all = () => Thing.query().returning('*').eager('category.[things]');

const create = ({ thing }) => {
  const thingParams = pick(thing, THING_VALID_PARAMS);
  const validationResult = Joi.validate(thingParams, thingValidation);
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details);
  }

  return Thing.query()
    .insert(thingParams)
    .returning('*')
    .eager('category.[things]');
};

module.exports = { all, create };
