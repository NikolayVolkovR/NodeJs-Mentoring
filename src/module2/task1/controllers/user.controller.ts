import {
    findUserById,
    findUsersAutoSuggest,
    handleUserCreate,
    handleUserDelete,
    handleUserUpdate
} from "../services/user.service";
import {users} from "../models/data";
import Ajv from 'ajv';
import {Request, Response} from 'express';
import {isEmptyObject} from "../helpers/helpers";
import { userCreateSchema } from "../models/user/user.shema";

const ajv = new Ajv({ allErrors: true });

export const userGetAllController = (req: Request, res: Response) => {
    res.json(users)
};

export const userGetByIdController = (req: Request, res: Response) => {
    const user = findUserById(req.params.id);

    if (user === null) {
        res.sendStatus(400).end();
    } else {
        res.json(user);
    }
};

export const usersGetAutoSuggestController = (req: Request, res: Response) => {
    const {limit, value} = req.body;

    if (limit === undefined || value === undefined) {
        res.sendStatus(400).end();
    } else {
        const users = findUsersAutoSuggest(limit, value);

        if (users === null) {
            res.sendStatus(400).end();
        } else {
            res.json(users);
        }
    }

};

export const userCreateController = (req: Request, res: Response) => {
    const validate = ajv.compile(userCreateSchema);
    const isValid = validate(req.body);

    if (!isValid) {
        console.log('___NOT_valid___');
        res.status(400).json(validate.errors)
    } else {
        console.log('+++valid+++');
        const user = handleUserCreate(req.body);

        res.location(`/user/${user.id}`);
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

export const userUpdateController = (req: Request, res: Response) => {
    const data = req.body;
    const user = findUserById(req.params.id);

    if (isEmptyObject(data) || user === undefined) {
        res.sendStatus(400).end();
    } else {
        handleUserUpdate(req.params.id, data);

        res.json(user);
    }
};

export const userDeleteController = (req: Request, res: Response) => {
    handleUserDelete(req.params.id);
    res.end()
};
