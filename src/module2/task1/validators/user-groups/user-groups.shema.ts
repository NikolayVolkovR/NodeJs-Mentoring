import Joi from "joi";

export const userGroupsSchema = Joi.object({
    users: Joi.array().items(Joi.number()).required(),
    groupId: Joi.number().required(),
});
