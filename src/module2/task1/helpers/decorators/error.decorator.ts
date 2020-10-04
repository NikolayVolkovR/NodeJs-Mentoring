import { NextFunction, Request, Response } from 'express';

export const errorDecorator = (target: any, key:string, descriptor) => {
    target[key] = (req: Request, res: Response, next: NextFunction) => {
        try {
            target[key](req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
