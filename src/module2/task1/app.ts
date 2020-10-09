import express from "express";
import { PORT } from "./config";
import { initLoaders } from "./loaders";
import { uncaughtExceptionHandler, unhandledRejectionHandler } from "./errors";
import { initDb } from "./database";

const startServer = async () => {
    const app = express();

    initLoaders({ expressApp: app });
    await initDb();

    app.listen(PORT, (error: Error) => {
        if (error) {
            throw error;
        }
        console.log(`Server started at http://localhost:${PORT}`);
    });

    process.on("uncaughtException", uncaughtExceptionHandler);
    process.on("unhandledRejection", unhandledRejectionHandler);
};

startServer();
