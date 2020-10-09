import { json } from "body-parser";
import { initRoutes } from "../api/routes";
import { API } from "../config";
import cors from "cors";

export default ({ app }) => {
    app.disable("x-powered-by");
    app.use(cors());
    app.use(json());
    app.use(API.PREFIX, initRoutes());
};
