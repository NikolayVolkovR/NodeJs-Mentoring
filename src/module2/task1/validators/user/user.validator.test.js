import { UserValidator } from "./user.validator";
import { ValidationError } from "../../errors";

describe("UserValidator update", () => {
    it("Should throw ValidationError if body is not valid", () => {
        const mockReq = { body: { login: "" } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.update(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith(new ValidationError("User update", {}));
    });

    it("Should throw ValidationError if body is empty", () => {
        const mockReq = {};
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.update(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith(new ValidationError("User update", {}));
    });

    it("Should call next() if body is valid", () => {
        const mockReq = { body: { login: "Ivan" } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.update(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith();
    });
});

describe("UserValidator create", () => {
    it("Should throw ValidationError if body is not valid", () => {
        const mockReq = { body: { login: "" } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.create(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith(new ValidationError("User create", {}));
    });

    it("Should call next() if body is valid", () => {
        const mockReq = { body: { login: "Ivan", password: "IvanPassword5", age: 18 } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.update(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith();
    });
});

describe("UserValidator autoSuggest", () => {
    it("Should throw ValidationError if body is not valid", () => {
        const mockReq = { body: { login: 1, limit: "ten" } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.autoSuggest(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith(new ValidationError("User auto-suggest", {}));
    });

    it("Should call next() if body is valid", () => {
        const mockReq = { body: { login: "Ma", limit: 2 } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.autoSuggest(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith();
    });
});

describe("UserValidator authenticate", () => {
    it("Should throw ValidationError if body is not valid", () => {
        const mockReq = { body: { login: "Maria", password: "" } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.authenticate(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith(new ValidationError("User authenticate", {}));
    });

    it("Should call next() if body is valid", () => {
        const mockReq = { body: { login: "Maria", password: "MariaPassword1" } };
        const mockRes = {};
        const mockNext = jest.fn();

        UserValidator.authenticate(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalledWith();
    });
});
