import {Request, Response, NextFunction} from "express";
import {UnauthorizedError} from "../errors";
import jwt from 'jsonwebtoken'
import {ForbiddenError} from "../errors/ForbiddenError";

export const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        throw new UnauthorizedError('No token provided');
    }

    const secret = process.env.JWT_SECRET_ENV;


    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            throw new ForbiddenError(error.message);
        }

        next();
    });
};