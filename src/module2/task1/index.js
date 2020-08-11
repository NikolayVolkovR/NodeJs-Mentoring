import {
    usersGetAutoSuggestController,
    userCreateController,
    userDeleteController,
    userGetAllController,
    userGetByIdController,
    userUpdateController
} from "./controllers/user.controller";
import { handleErrors } from "./services/user.service";

const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');

app.listen(3000);

router.use(bodyParser.json());

router.route('/user/auto-suggest').post(usersGetAutoSuggestController);

router.route('/user')
    .get(userGetAllController)
    .post(userCreateController);

router.route('/user/:id')
    .get(userGetByIdController)
    .put(userUpdateController)
    .delete(userDeleteController);

app.use('/', router);
app.use(handleErrors);