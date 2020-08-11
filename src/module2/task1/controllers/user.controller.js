"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteController = exports.userUpdateController = exports.userCreateController = exports.usersGetAutoSuggestController = exports.userGetByIdController = exports.userGetAllController = void 0;
var user_service_1 = require("../services/user.service");
var data_1 = require("../models/data");
var ajv_1 = __importDefault(require("ajv"));
var helpers_1 = require("../helpers/helpers");
var user_shema_1 = require("../models/user/user.shema");
var ajv = new ajv_1.default({ allErrors: true });
exports.userGetAllController = function (req, res) {
    res.json(data_1.users);
};
exports.userGetByIdController = function (req, res) {
    var user = user_service_1.findUserById(req.params.id);
    if (user === null) {
        res.sendStatus(400).end();
    }
    else {
        res.json(user);
    }
};
exports.usersGetAutoSuggestController = function (req, res) {
    var _a = req.body, limit = _a.limit, value = _a.value;
    if (limit === undefined || value === undefined) {
        res.sendStatus(400).end();
    }
    else {
        var users_1 = user_service_1.findUsersAutoSuggest(limit, value);
        if (users_1 === null) {
            res.sendStatus(400).end();
        }
        else {
            res.json(users_1);
        }
    }
};
exports.userCreateController = function (req, res) {
    var validate = ajv.compile(user_shema_1.userCreateSchema);
    var isValid = validate(req.body);
    if (!isValid) {
        console.log('___NOT_valid___');
        res.status(400).json(validate.errors);
    }
    else {
        console.log('+++valid+++');
        var user = user_service_1.handleUserCreate(req.body);
        res.location("/user/" + user.id);
        res.sendStatus(201).end();
    }
};
/*export const userCreateController = (req: Request, res: Response) => {
    const data = req.body;

    if (isEmptyObject(data)) {
        res.sendStatus(400).end();
    } else {
        const user = handleUserCreate(data);

        res.location(`/user/${user.id}`);
        res.sendStatus(201).end();
    }
};*/
exports.userUpdateController = function (req, res) {
    var data = req.body;
    var user = user_service_1.findUserById(req.params.id);
    if (helpers_1.isEmptyObject(data) || user === undefined) {
        res.sendStatus(400).end();
    }
    else {
        user_service_1.handleUserUpdate(req.params.id, data);
        res.json(user);
    }
};
exports.userDeleteController = function (req, res) {
    user_service_1.handleUserDelete(req.params.id);
    res.end();
};
