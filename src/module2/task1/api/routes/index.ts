import { Router } from "express";
import { initUserRoutes } from "./user.routes";
import { initGroupRoutes } from "./group.routes";
import { initUserGroupsRoutes } from "./user-groups.routes";
import { initNotFoundRoute } from "./not-found.routes";

export const initRoutes = () => {
    const app = Router();
    initUserRoutes(app);
    initGroupRoutes(app);
    initUserGroupsRoutes(app);
    initNotFoundRoute(app);

    return app;
};
