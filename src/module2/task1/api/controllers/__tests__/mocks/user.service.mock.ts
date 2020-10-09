import { UserServiceType } from "../../../../services/user.service";
import { NotFoundError } from "../../../../errors";
import { UserAttributes, UserCreateAttributes, UserUpdateAttributes } from "../../../../models/user/user.types";

const EXISTING_ID = 1;

export const makeTestUser = async (
    id: number,
    login = "Maria",
    password = "MariaPassword1",
    age = 25,
    isDeleted = false,
): Promise<UserAttributes> => {
    return Promise.resolve({
        id,
        login,
        password,
        age,
        isDeleted,
    });
};

export const makeTestUsers = async () => {
    const users = [];
    for (let i = 1; i < 4; i++) {
        users.push(await makeTestUser(i));
    }

    return Promise.resolve(users);
};

export const makeTestToken = (login: string, password: string) => Buffer.from(`${login}:${password}`).toString();

export class UserServiceMock implements UserServiceType {
    async getAll(): Promise<UserAttributes[]> {
        return makeTestUsers();
    }

    async getById(id: number): Promise<UserAttributes> {
        if (id !== EXISTING_ID) {
            throw new NotFoundError(`Not found User with id ${id}`);
        }

        return await makeTestUser(id);
    }

    async getSuggest(limit: number, login: string): Promise<UserAttributes[] | null> {
        const users = await makeTestUsers();

        return Promise.resolve(users.filter((user) => user.login.includes(login)).slice(0, limit));
    }

    async create(userDate: UserCreateAttributes): Promise<UserAttributes> {
        return await makeTestUser(1, userDate.login, userDate.password);
    }

    async update(id: number, data: UserUpdateAttributes): Promise<UserAttributes> {
        return await makeTestUser(id, data.login);
    }

    async delete(_: number): Promise<void> {
        return Promise.resolve();
    }

    async checkExists(id: number): Promise<boolean> {
        return Promise.resolve(id === EXISTING_ID);
    }

    async getAuthToken(login: string, password: string): Promise<string> {
        return Promise.resolve(makeTestToken(login, password));
    }
}
