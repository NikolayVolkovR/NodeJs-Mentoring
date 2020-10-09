import { GroupController } from "../group.controller";
import { GroupServiceMosk, makeTestGroup, makeTestGroups } from "./mocks/group.service.mosk";
import { NextFunction, Request, Response } from "express";

const service = new GroupServiceMosk();
const controller = new GroupController(service);

describe("Group controller", () => {
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
        nextMock = jest.fn();
        resMock = ({
            json: jsonMock,
            locals: {},
            send: sendMock,
        } as unknown) as Response;
        resMock.location = locationMock.mockReturnValue(resMock);
        resMock.status = statusMock.mockReturnValue(resMock);
    });

    it("Returns groupById", async () => {
        const id = 1;
        reqMock = ({ params: { id } } as unknown) as Request;

        await controller.getById(reqMock, resMock, nextMock);
        const group = await makeTestGroup(id);
        expect(jsonMock).toBeCalledWith({ group });
    });

    it("Returns all groups", async () => {
        await controller.getAll(reqMock, resMock, nextMock);
        const groups = await makeTestGroups();
        expect(jsonMock).toBeCalledWith({ groups });
    });

    it("Checks group exists", async () => {
        const id = 1;
        reqMock = ({ params: { id } } as unknown) as Request;
        await controller.checkExists(reqMock, resMock, nextMock);
        expect(nextMock).toBeCalledWith();
    });

    it("Creates group", async () => {
        reqMock = { body: { name: "Users", permissions: ["READ"] } } as Request;
        await controller.create(reqMock, resMock, nextMock);
        const group = await makeTestGroup(1);
        expect(jsonMock).toBeCalledWith({ group });
    });

    it("Updates group", async () => {
        const id = 1;
        const name = "Users";
        const permissions = ["READ"];
        reqMock = ({
            params: { id },
            body: {
                name,
                permissions,
            },
        } as unknown) as Request;
        await controller.update(reqMock, resMock, nextMock);
        const group = await makeTestGroup(id, name, permissions);
        expect(jsonMock).toBeCalledWith({ group });
    });

    it("Deletes group", async () => {
        reqMock = ({ params: { id: 1 } } as unknown) as Request;
        await controller.delete(reqMock, resMock, nextMock);
        expect(statusMock).toBeCalledWith(204);
    });
});
