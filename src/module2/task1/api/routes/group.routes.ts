import { Router } from "express";
import { GroupController } from "../controllers/group.controller";
import { GroupValidator } from "../../validators/group/group.validator";
import { requestLoggerMiddleware } from "../../middlewares/request-logger.middleware";
import { checkTokenMiddleware } from "../../middlewares/check-token.milldeware";
import { GroupRepository } from "../../repositories/group.repository";
import { GroupService } from "../../services/group.service";

const route = Router();
const repository = new GroupRepository();
const service = new GroupService(repository);
const groupController = new GroupController(service);

export const initGroupRoutes = (app: Router) => {
    app.use("/groups", route);

    route.use(requestLoggerMiddleware, checkTokenMiddleware);

    route.route("").get(groupController.getAll).post(GroupValidator.create, groupController.create);
    route
        .use("/:id", groupController.checkExists)
        .route("/:id")
        .get(groupController.getById)
        .put(GroupValidator.update, groupController.update)
        .delete(groupController.delete);
};
