import logger from "../helpers/logger";

export const uncaughtExceptionHandler = (error: Error) => {
    logger.error('uncaughtException', { error });
    process.exit(1);
};