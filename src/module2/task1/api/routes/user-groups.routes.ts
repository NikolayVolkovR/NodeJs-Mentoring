import { Router } from 'express';
import { UserGroupsController } from '../controllers/user-groups.controller';
import { UserGroupValidator } from '../../validators/user-groups/user-group.validator';
import { requestLoggerMiddleware } from '../../middlewares/request-logger.middleware';
import { checkTokenMiddleware } from '../../middlewares/check-token.milldeware';

const route = Router();

export const initUserGroupsRoutes = (app: Router) => {
    app.use('/user-groups', route);

    route.use(requestLoggerMiddleware, checkTokenMiddleware);

    route.post(
        '',
        UserGroupValidator.addUsersToGroup,
        UserGroupsController.addUsersToGroup,
    );
};
