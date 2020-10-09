import Joi from "joi";

export const login = Joi.string().min(1);
export const password = Joi.string().regex(/(?=.*\d)(?=.*[a-z])[a-z\d]{6,}$/);
export const age = Joi.number();
export const limit = Joi.number();

export const userCreateSchema = Joi.object({
    login: login.required(),
    password: password.required(),
    age,
});

export const userUpdateSchema = Joi.object({
    login,
    password,
    age,
});

export const usersAutoSuggestSchema = Joi.object({
    login,
    limit,
});
