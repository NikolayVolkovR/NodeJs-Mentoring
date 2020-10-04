import { NextFunction, Request, Response } from 'express';
import { userGroupsSchema } from './user-groups.shema';
import { ValidationError } from '../../errors';

export class UserGroupValidator {
    static async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const { error } = userGroupsSchema.validate(body);

        if (error !== undefined) {
            next(new ValidationError('UserGroup addUserToGroup', {error}))
        }

        next();
    }
}
