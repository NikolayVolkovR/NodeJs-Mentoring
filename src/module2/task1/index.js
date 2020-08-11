"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("./controllers/user.controller");
var user_service_1 = require("./services/user.service");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var router = express_1.default.Router();
app.listen(3000);
router.use(body_parser_1.default.json());
router.route('/user/auto-suggest').post(user_controller_1.usersGetAutoSuggestController);
router.route('/user')
    .get(user_controller_1.userGetAllController)
    .post(user_controller_1.userCreateController);
router.route('/user/:id')
    .get(user_controller_1.userGetByIdController)
    .put(user_controller_1.userUpdateController)
    .delete(user_controller_1.userDeleteController);
app.use('/', router);
app.use(user_service_1.handleErrors);
