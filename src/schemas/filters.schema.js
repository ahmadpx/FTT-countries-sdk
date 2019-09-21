import Joi from '@hapi/joi';

export default Joi.object().keys({
  languages: Joi.array()
    .items(
      Joi.object().keys({
        groupId: Joi.string().required(),
        value: Joi.string().required(),
        count: Joi.number().required(),
      }),
    )
    .required(),
  currencies: Joi.array()
    .items(
      Joi.object().keys({
        groupId: Joi.string().required(),
        value: Joi.string().required(),
        count: Joi.number().required(),
      }),
    )
    .required(),
  regions: Joi.array()
    .items(
      Joi.object().keys({
        groupId: Joi.string().required(),
        value: Joi.string().required(),
        count: Joi.number().required(),
      }),
    )
    .required(),
});
