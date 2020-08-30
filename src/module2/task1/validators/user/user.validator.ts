import { Request, Response, NextFunction } from 'express';
import { userCreateSchema, usersAutoSuggestSchema, userSchema } from './user.shema';
import Ajv from 'ajv';
import { default as ajvErrors } from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

export class UserValidator {
  static async autoSuggest(req: Request, res: Response, next: NextFunction) {
    const validate = ajv.compile(usersAutoSuggestSchema);
    const isValid = validate(req.body);

    if (!isValid) {
      return res.status(400).json({ status: 400, errors: validate.errors });
    }

    next();
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const validate = ajv.compile(userSchema);
    const isValid = validate(req.body);

    if (!isValid) {
      return res.status(400).json({ status: 400, error: validate.errors });
    }

    next();
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const validate = ajv.compile(userCreateSchema);
    const isValid = validate(req.body);

    if (!isValid) {
      return res.status(400).json({ status: 400, errors: validate.errors });
    }

    next();
  }
}
