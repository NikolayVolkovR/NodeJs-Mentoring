import { handleErrors } from "./services/user.service";
import express from "express";
import { userRouter } from "./routes/user.routes";
import { PORT, API } from "../../config";
import { json } from 'body-parser';

const app = express();
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

app.use(json());
app.use(API.PREFIX, userRouter);
app.use(handleErrors);
