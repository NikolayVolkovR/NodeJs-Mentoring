import {users} from "../models/data";
import {v4 as uuidv4} from "uuid";
import {ErrorRequestHandler} from 'express';
import {userCreateProps, userUpdateProps, userProps} from "../models/user/user.types";

export const findUserById = (id: string) => {
    return users.find((user) => user.id === id)
};

export const findUsersAutoSuggest = (limit: number, value: string) => {
    return users.filter(({ login }) => login.indexOf(value) === 0).slice(0, limit)
};

export const handleUserUpdate = (userId: string, data: userUpdateProps) => {
    const index = users.findIndex(({id}) => id = userId);

    users[index] = Object.assign(users[index], data);
};

export const handleUserCreate = (data: userCreateProps): userProps => {
    const user = {
        id: uuidv4(),
        ...data,
        isDeleted: false,
    };

    users.push(user);

    return user;
};

export const handleUserDelete = (userId: string) => {
    users.forEach((user) => {
        if (user.id === userId) {
            user.isDeleted = true;
        }
    })
};

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(500).render('error', { error: err });
};