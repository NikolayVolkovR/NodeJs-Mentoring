import { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logger';

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Request', {
        method: req.method,
        params: req.params,
        body: req.body,
    });
    next();
};
