import { NextFunction, Request, Response } from "express";
import logger from "../helpers/logger";
import { CustomError, ValidationError, NotFoundError, UnauthorizedError } from "../errors";

export const errorHandlerMiddleware = (app) => {
    app.use(function (error: Error | CustomError, req: Request, res: Response, _next: NextFunction) {
        const status = error instanceof CustomError ? error.status : 500;
        if (error instanceof CustomError) {
            const meta = {
                stack: error.stack,
                arguments: req.params,
                body: req.body,
            };

            if (error instanceof ValidationError) {
                Object.assign(meta, { error: error.error });
            }

            logger.error(`${error.name}:${error.message}`, meta);
        } else {
            logger.error("Internal Server Error", { stack: error.stack });
        }

        return res.status(status).json({ message: error.message, ...error });
    });
};
