import { Request, Response, NextFunction } from 'express';
import { userCreateSchema, usersAutoSuggestSchema, userSchema } from './user.shema';
import Ajv from 'ajv';
import { default as ajvErrors } from 'ajv-errors';
import { UserService } from '../../services/user.service';
import { UserModel } from "../../models/user/user.model";

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
const userService = new UserService(UserModel);

export class UserValidator {
  static async checkExits(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await userService.getById(userId);

    if (user === undefined) {
      return res.status(400).json({ status: 400, error: `Not found User with id ${userId}` });
    }

    res.locals.user = user;

    next();
  }

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
