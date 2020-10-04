import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../../validators/user/user.validator';
import { requestLoggerMiddleware } from '../../middlewares/request-logger.middleware';

const route = Router();

export const initUserRoutes = (app: Router) => {
    app.use('/users', route);

    route
        .use('', requestLoggerMiddleware)
        .route('')
        .get(UserController.getAll)
        .post(UserValidator.create, UserController.create);

    route
        .route('/auto-suggest')
        .post(requestLoggerMiddleware, UserValidator.autoSuggest, UserController.autoSuggest);
    route

        .use('/:id', requestLoggerMiddleware)
        .route('/:id')
        .get(UserController.getById)
        .put(UserValidator.update, UserController.update)
        .delete(UserController.delete);
};
