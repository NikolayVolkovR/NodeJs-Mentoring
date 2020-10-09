import { db } from "./db";
import { preFillTables } from "./pre-fill-tables";
import { DataBaseError } from "../errors/DataBaseError";

export const initDb = async () => {
    try {
        await db.sequelize.sync({ force: true });
        await preFillTables();
    } catch (error) {
        throw new DataBaseError("Init Database error", error);
    }
};
