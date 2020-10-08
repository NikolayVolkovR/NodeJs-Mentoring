import { Router } from 'express';
import { GroupController } from '../controllers/group.controller';
import { GroupValidator } from '../../validators/group/group.validator';
import { requestLoggerMiddleware } from '../../middlewares/request-logger.middleware';
import { checkTokenMiddleware } from '../../middlewares/check-token.milldeware';

const route = Router();

export const initGroupRoutes = (app: Router) => {
    app.use('/groups', route);

    route.use(requestLoggerMiddleware, checkTokenMiddleware);

    route
        .route('')
        .get(GroupController.getAll)
        .post(GroupValidator.create, GroupController.create);
    route
        .use('/:id', GroupController.checkExists)
        .route('/:id')
        .get(GroupController.getById)
        .put(GroupValidator.update, GroupController.update)
        .delete(GroupController.delete);
};
