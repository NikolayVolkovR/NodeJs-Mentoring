import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { CustomError, ValidationError, NotFoundError } from '../errors';

export const errorHandlerMiddleware = (app) => {
    app.use(function (error: Error | CustomError, req: Request, res: Response, _next: NextFunction) {
        const status = error instanceof CustomError ? error.status : 500;
        if (error instanceof ValidationError) {
            logger.error(`${error.name}:${error.message}`, {
                error: error.error,
                stack: error.stack,
                arguments: req.params,
                body: req.body,
            });

        } else if (error instanceof NotFoundError) {
            logger.error(`${error.name}:${error.message}`, {
                stack: error.stack,
                arguments: req.params,
                body: req.body,
            });
        } else {
            logger.error('Internal Server Error', { stack: error.stack });
        }

        return res.status(status).json({message: error.message, ...error});
    });
};
