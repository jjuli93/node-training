const Joi = require('joi');
const { pick } = require('lodash');

const { ValidationError, CategoryNotFound } = require('../errors');

const { Thing } = require('../models/thing');
const { Category } = require('../models/category');
const validations = require('../validations/thing');

const THING_VALID_PARAMS = ['name', 'category_id'];

const all = ({ page, pageSize }) =>
  Thing.query()
    .modify('active')
    .returning('*')
    .eager('category.[things]')
    .page(page, pageSize);

const create = async ({ thing }) => {
  const thingParams = pick(thing, THING_VALID_PARAMS);
  const validationResult = Joi.validate(thingParams, validations.create);
  if (validationResult.error) {
    throw new ValidationError({ details: validationResult.error.details });
  }

  const category = await Category.query().findById(thing.category_id);

  if (!category) {
    throw new CategoryNotFound({
      message: 'Category not found', // NOTE: this doesnt appear in the response, only in the logs
      categoryId: thing.category_id,
      details: 'No category was found with the given id',
    });
  }

  return Thing.query()
    .insert(thingParams)
    .returning('*')
    .eager('category.[things]');
};

module.exports = { all, create };
