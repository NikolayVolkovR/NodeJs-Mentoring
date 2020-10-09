import { UserController } from "../user.controller";
import { makeTestToken, UserServiceMock } from "./mocks/user.service.mock";
import { NotFoundError } from "../../../errors";
import { makeTestUser, makeTestUsers } from "./mocks/user.service.mock";
import { NextFunction, Request, Response } from "express";

const service = new UserServiceMock();
const controller = new UserController(service);

describe("User controller", () => {
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let locationMock: jest.Mock;
    let sendMock: jest.Mock;
    let reqMock: Request;
    let resMock: Response;
    let nextMock: NextFunction;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn();
        locationMock = jest.fn();
        sendMock = jest.fn();
        nextMock = jest.fn();
        resMock = ({
            json: jsonMock,
            locals: {},
            send: sendMock,
        } as unknown) as Response;

        resMock.location = locationMock.mockReturnValue(resMock);
        resMock.status = statusMock.mockReturnValue(resMock);
    });

    it("Returns userByID if exists", async () => {
        const id = 1;
        reqMock = ({ params: { id } } as unknown) as Request;

        await controller.getById(reqMock, resMock, nextMock);
        const user = await makeTestUser(id);
        expect(jsonMock.mock.calls[0][0]).toEqual({ user });
    });

    it("Returns NotFoundError if userById doesn't exist", async () => {
        const id = 5;
        reqMock = ({ params: { id } } as unknown) as Request;
        await controller.getById(reqMock, resMock, nextMock);
        expect(nextMock).toBeCalledWith(new NotFoundError(`Not found User with id ${id}`));
    });

    it("Returns all users", async () => {
        await controller.getAll(reqMock, resMock, nextMock);
        const users = await makeTestUsers();
        expect(jsonMock.mock.calls[0][0]).toEqual({ users });
    });

    it("Returns users autosuggestion", async () => {
        reqMock = { body: { login: "Ma", limit: 3 } } as Request;
        await controller.autoSuggest(reqMock, resMock, nextMock);
        expect(jsonMock.mock.calls[0][0].users).toHaveLength(3);
    });

    it("Creates user", async () => {
        reqMock = { body: { login: "Maria", password: "MariaPassword1" } } as Request;
        await controller.create(reqMock, resMock, nextMock);
        const user = await makeTestUser(1);
        expect(jsonMock.mock.calls[0][0]).toEqual({ user });
        expect(statusMock.mock.calls[0][0]).toBe(201);
        expect(locationMock.mock.calls[0][0]).toBe(`/users/${user.id}`);
    });

    it("Updates user", async () => {
        const id = 2;
        const login = "new login";
        const user = await makeTestUser(id, login);
        reqMock = ({
            body: { login },
            params: { id },
        } as unknown) as Request;
        await controller.update(reqMock, resMock, nextMock);
        expect(jsonMock.mock.calls[0][0]).toEqual({ user });
    });

    it("Deletes user", async () => {
        reqMock = ({ params: { id: 1 } } as unknown) as Request;
        await controller.delete(reqMock, resMock, nextMock);
        expect(statusMock).toBeCalledWith(204);
    });

    it("Checks user exists", async () => {
        reqMock = ({ params: { id: 1 } } as unknown) as Request;
        await controller.checkExists(reqMock, resMock, nextMock);
        expect(nextMock).toBeCalledWith();
    });

    it("Makes JWT token", async () => {
        const login = "Login";
        const password = "Password";
        reqMock = { body: { login, password } } as Request;
        const token = makeTestToken(login, password);
        await controller.login(reqMock, resMock, nextMock);
        expect(sendMock).toBeCalledWith(token);
    });
});
