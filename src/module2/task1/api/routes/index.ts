import { Router } from 'express';
import { initUserRoutes } from './user.routes';
import { initGroupRoutes } from './group.routes';
import { initUserGroupsRoutes } from './user-groups.routes';

export default () => {
    const app = Router();
    initUserRoutes(app);
    initGroupRoutes(app);
    initUserGroupsRoutes(app);

    return app;
};
