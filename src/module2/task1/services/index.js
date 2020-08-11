import {users} from "../data";
import {v4 as uuidv4} from "uuid";

export const findUserById = (id) => {
    return users.find((user) => user.id === id)
};

export const findUsersAutoSuggest = (limit, value) => {
    return users.filter(({ login }) => login.indexOf(value) === 0).slice(0, limit)
};

export const handleUserUpdate = (userId, data) => {
    const index = users.findIndex(({id}) => id = userId);

    users[index] = Object.assign(users[index], data);
};

export const handleUserCreate = (user) => {
    user.id = uuidv4();
    user.isDeleted = false;
    users.push(user);

    return user;
};
export const handleUserDelete = (userId) => {
    users.forEach((user) => {
        if (user.id === userId) {
            user.isDeleted = true;
        }
    })
};