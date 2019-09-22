import Joi from '@hapi/joi';

export default Joi.object().keys({
  name: Joi.string().required(),
  capital: Joi.string().required().allow(''),
  region: Joi.string().required().allow(''),
  code: Joi.string().required().allow(''),
  population: Joi.number().required(),
  currencies: Joi.array().items(Joi.string()),
  languages: Joi.array().items(Joi.string()),
});
