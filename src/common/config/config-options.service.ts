import * as Joi from 'joi';

export const CONFIG_OPTIONS_PROVIDER = {
  isGlobal: true,
  validationSchema: Joi.object({
    APP_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DOCS_TITLE: Joi.string().required(),
    DOCS_DESCRIPTION: Joi.string().required(),
    DOCS_VERSION: Joi.string().required(),
    DOCS_TAG: Joi.string().required(),
  }),
};
