const Joi = require('joi');

const create = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  public: Joi.bool().default(false),
  user_id: Joi.number().required(),
});

const update = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  public: Joi.bool().default(false),
});

module.exports = {
  create,
  update,
};
