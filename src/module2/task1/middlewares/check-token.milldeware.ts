import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "../errors/ForbiddenError";
import { JWT_SECRET } from "../config";

export const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        throw new UnauthorizedError("No token provided");
    }

    jwt.verify(token, JWT_SECRET, (error) => {
        if (error) {
            throw new ForbiddenError(error.message);
        }

        return next();
    });
};
