import { NextFunction } from "express";

export const controllerErrorDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
            return await originalMethod.apply(this, [req, res, next]);
        } catch (error) {
            return next(error);
        }
    };
};
