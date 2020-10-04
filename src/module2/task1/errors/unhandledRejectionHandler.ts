import logger from "../logger";

export const unhandledRejectionHandler = (error: Error) => {
    logger.error('Unhandled Promise Rejection', {error})
};