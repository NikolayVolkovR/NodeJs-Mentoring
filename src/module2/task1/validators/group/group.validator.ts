import { Request, Response, NextFunction } from 'express';
import { groupCreateSchema, groupUpdateSchema } from "./group.schema";
import Ajv from 'ajv';
import { default as ajvErrors } from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

export class GroupValidator {
    static async create(req: Request, res: Response, next: NextFunction) {
        const validate = ajv.compile(groupCreateSchema);
        const isValid = validate(req.body);

        if (!isValid) {
            return res.status(400).json({ status: 400, errors: validate.errors });
        }

        next();
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const validate = ajv.compile(groupUpdateSchema);
        const isValid = validate(req.body);

        if (!isValid) {
            return res.status(400).json({ status: 400, errors: validate.errors });
        }

        next();
    }
}