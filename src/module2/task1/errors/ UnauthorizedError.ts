import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}