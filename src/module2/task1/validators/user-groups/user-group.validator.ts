import { NextFunction, Request, Response } from 'express';
import { userGroupsSchema } from './user-groups.shema';

export class UserGroupValidator {
    static async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const { error, value } = userGroupsSchema.validate(body);

        if (error !== undefined) {
            return res.status(400).json({ status: 400, error });
        }

        next();
    }
}
