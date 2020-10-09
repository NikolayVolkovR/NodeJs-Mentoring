import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserValidator } from "../../validators/user/user.validator";
import { requestLoggerMiddleware } from "../../middlewares/request-logger.middleware";
import { checkTokenMiddleware } from "../../middlewares/check-token.milldeware";
import { UserService } from "../../services/user.service";
import { UserRepository } from "../../repositories/user.repository";

const route = Router();
const repository = new UserRepository();
const service = new UserService(repository);
const userController = new UserController(service);

export const initUserRoutes = (app: Router) => {
    app.use("/users", route);

    route.use(requestLoggerMiddleware);

    route.route("/auto-suggest").post(checkTokenMiddleware, UserValidator.autoSuggest, userController.autoSuggest);

    route.route("/authenticate").post(UserValidator.authenticate, userController.login);

    route
        .route("/:id")
        .get(userController.getById)
        .put(UserValidator.update, userController.update)
        .delete(userController.delete);

    route
        .use("", checkTokenMiddleware)
        .route("")
        .get(userController.getAll)
        .post(UserValidator.create, userController.create);
};
