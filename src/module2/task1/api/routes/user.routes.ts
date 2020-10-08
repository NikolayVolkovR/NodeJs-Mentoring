import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../../validators/user/user.validator';
import { requestLoggerMiddleware } from '../../middlewares/request-logger.middleware';
import { checkTokenMiddleware } from '../../middlewares/check-token.milldeware';

const route = Router();

export const initUserRoutes = (app: Router) => {
    app.use('/users', route);

    route.use(requestLoggerMiddleware);

    route.route('/auto-suggest').post(checkTokenMiddleware, UserValidator.autoSuggest, UserController.autoSuggest);

    route.route('/authenticate').post(UserValidator.authenticate, UserController.login);

    route
        .use('/:id', checkTokenMiddleware)
        .route('/:id')
        .get(UserController.getById)
        .put(UserValidator.update, UserController.update)
        .delete(UserController.delete);

    route
        .use('', checkTokenMiddleware)
        .route('')
        .get(UserController.getAll)
        .post(UserValidator.create, UserController.create);
};
