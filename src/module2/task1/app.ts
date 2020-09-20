import express from 'express';
import { PORT } from './config';
import { db } from './database/db';
import { preFillTables } from "./database/pre-fill-tables";

const startServer = async () => {
    const app = express();

    await require('./loaders').default({ expressApp: app });
    await db.sequelize.sync({ force: true });
    await preFillTables();

    app.listen(PORT, (err) => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
};

startServer();
