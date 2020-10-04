import {CustomError} from "./CustomError";

export class DataBaseError extends CustomError {
    public error: object;

    constructor(message: string, error: Error) {
        super(message, 500);
        this.error = error;
    }
}