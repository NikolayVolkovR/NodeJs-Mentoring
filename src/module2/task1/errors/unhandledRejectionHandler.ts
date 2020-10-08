import logger from "../helpers/logger";

export const unhandledRejectionHandler = (error: Error) => {
    logger.error('Unhandled Promise Rejection', {error})
};