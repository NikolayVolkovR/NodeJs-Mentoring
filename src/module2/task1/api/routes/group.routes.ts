import { Router } from 'express';
import { GroupController } from '../controllers/group.controller';
import { GroupValidator } from '../../validators/group/group.validator';
import { requestLoggerMiddleware } from '../../middlewares/request-logger.middleware';

const route = Router();

export const initGroupRoutes = (app: Router) => {
    app.use('/groups', route);

    route
        .use('', requestLoggerMiddleware)
        .route('')
        .get(GroupController.getAll)
        .post(GroupValidator.create, GroupController.create);
    route
        .use('/:id', requestLoggerMiddleware, GroupController.checkExists)
        .route('/:id')
        .get(GroupController.getById)
        .put(GroupValidator.update, GroupController.update)
        .delete(GroupController.delete);
};
