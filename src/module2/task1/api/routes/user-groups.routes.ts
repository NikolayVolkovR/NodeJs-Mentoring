import { Router } from 'express';
import { UserGroupsController } from '../controllers/user-groups.controller';
import { UserGroupValidator } from '../../validators/user-groups/user-group.validator';

const route = Router();

export const initUserGroupsRoutes = (app: Router) => {
    app.use('/user-groups', route);
    route.post('', UserGroupValidator.addUsersToGroup, UserGroupsController.addUsersToGroup);
};
