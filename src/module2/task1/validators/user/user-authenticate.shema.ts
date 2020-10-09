import Joi from "joi";
import { login, password } from "./user.shema";

export const authenticateSchema = Joi.object({
    login,
    password,
});
