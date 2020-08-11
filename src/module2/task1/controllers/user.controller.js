import {handleUserCreate, handleUserDelete} from "../services/user.service";
import {users} from "../data";
import { findUserById, handleUserUpdate, findUsersAutoSuggest } from "../services/user.service";
import Ajv from 'ajv';
import { userCreateSchema } from "../validation-shemas/user.shema";

const ajv = new Ajv({ allErrors: true });

export const userGetAllController = (req, res) => {
    res.json(users)
};

export const userGetByIdController = (req, res) => {
    const user = findUserById(req.params.id);

    if (user === null) {
        res.sendStatus(400).end();
    }

    res.json(user);
};

export const usersGetAutoSuggestController = (req, res) => {
    const {limit, value} = req.body;

    if (limit === undefined || value === undefined) {
        res.sendStatus(400).end();
    }

    const users = findUsersAutoSuggest(limit, value);

    if (users === null) {
        res.sendStatus(400).end();
    }

    res.json(users);
};

export const userCreateController = (req, res) => {
    const validate = ajv.compile(userCreateSchema);
    const isValid = validate(req.body);

    if (!isValid) {
        res.sendStatus(400).json(validate.errors)
    }

    const user = handleUserCreate(req.body);

    res.location(`/user/${user.id}`);
    res.sendStatus(201).end();
};

/*export const userCreateController = (req, res) => {
    if (req.body === {}) {
        res.sendStatus(400).end();
    }

    const user = handleUserCreate(req.body);

    res.location(`/user/${user.id}`);
    res.sendStatus(201).end();
};*/

export const userUpdateController = (req, res) => {
    const data = req.body;

    const user = findUserById(req.params.id);

    if (data === {} || user === undefined) {
        res.sendStatus(400).end();
    }

    handleUserUpdate(req.params.id, data);

    res.json(user);
};

export const userDeleteController = (req, res) => {
    handleUserDelete(req.params.id);
    res.end()
};
