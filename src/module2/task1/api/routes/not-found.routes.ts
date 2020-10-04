import { Router } from 'express';
import { NotFoundError } from '../../errors';

export const initNotFoundRoute = (app: Router) => {
    app.all('*', (req, res, next) => {
        next(new NotFoundError('Route not found'));
    });
};
