import expressLoader from './express';
import {errorHandlerMiddleware} from "../middlewares/error-handler.middleware";

export const initLoaders = ({ expressApp }) => {
    expressLoader({ app: expressApp });
    errorHandlerMiddleware(expressApp);
};
