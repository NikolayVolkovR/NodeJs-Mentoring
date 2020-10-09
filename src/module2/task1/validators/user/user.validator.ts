import { Request, Response, NextFunction } from "express";
import { userCreateSchema, usersAutoSuggestSchema, userUpdateSchema } from "./user.shema";

import { ValidationError } from "../../errors";
import { authenticateSchema } from "./user-authenticate.shema";
import "babel-polyfill";


export class UserValidator {
    static async autoSuggest(req: Request, res: Response, next: NextFunction) {
        const { error } = usersAutoSuggestSchema.validate(req.body);

        if (error !== undefined) {
            return next(new ValidationError("User auto-suggest", error));
        }

        return next();
    }

    static update(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        const { error } = userUpdateSchema.validate(body);

        if (error !== undefined) {
            return next(new ValidationError("User update", error));
        }

        if (
            body === undefined ||
            (body.login === undefined &&
                body.age === undefined &&
                body.password === undefined &&
                body.isDeleted === undefined)
        ) {
            return next(new ValidationError("User update", { message: "No user data" }));
        }

        return next();
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const { error } = userCreateSchema.validate(req.body);

        if (error !== undefined) {
            return next(new ValidationError("User create", error));
        }

        return next();
    }

    static async authenticate(req: Request, res: Response, next: NextFunction) {
        const { error } = authenticateSchema.validate(req.body);

        if (error !== undefined) {
            return next(new ValidationError("User authenticate", { error }));
        }

        return next();
    }
}
