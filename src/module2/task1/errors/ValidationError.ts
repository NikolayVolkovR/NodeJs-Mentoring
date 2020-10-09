import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
    public error: object;

    constructor(message: string, error: object) {
        super(message, 400);
        this.error = error;
    }
}
