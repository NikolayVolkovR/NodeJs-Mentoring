import { json } from 'body-parser';
import routes from '../api/routes';
import { API } from "../config";

export default ({app}) => {
    app.use(json());
    app.use(process.env.PORT || API.PREFIX, routes());
    app.use((err, req, res) => {
        console.error(err.stack);
        res.sendStatus(500).render('error', { error: err });
    });
}