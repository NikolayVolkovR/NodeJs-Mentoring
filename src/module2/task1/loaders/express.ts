import { json } from 'body-parser';
import routes from '../api/routes';
import { API } from '../config';

export default ({ app }) => {
    app.use(json());
    app.use(process.env.PORT || API.PREFIX, routes());
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({error: err});
    });
};
