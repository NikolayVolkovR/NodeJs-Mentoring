import Joi from 'joi';

export const authenticateSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
});
