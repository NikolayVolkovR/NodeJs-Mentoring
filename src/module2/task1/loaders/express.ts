import { json } from 'body-parser';
import { initRoutes } from '../api/routes';
import { API } from '../config';

export default ({ app }) => {
    app.disable('x-powered-by');
    app.use(json());
    app.use(process.env.PORT || API.PREFIX, initRoutes());
};
