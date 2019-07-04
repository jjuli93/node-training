const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .required(),
  category_id: Joi.number().required(),
});
