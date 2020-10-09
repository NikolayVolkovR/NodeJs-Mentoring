import dotenv from "dotenv";
import dotenvParseVariables from "dotenv-parse-variables";
import { Dialect } from "sequelize";

export interface dbConfigType {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
}

export enum nodeEnvType {
    development = "development",
    test = "test",
    production = "production",
}

const env = dotenv.config();

if (env.error) throw env.error;

export const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_HOST,
    DB_DIALECT,
    PORT,
    PREFIX,
    JWT_SECRET,
    JWT_EXPIRES,
} = dotenvParseVariables(env.parsed);

export const API = {
    PREFIX,
};

export const dbConfig = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: DB_DIALECT as Dialect,
    },
};

export const NODE_ENV = process.env.NODE_ENV;

export const getDbConfig = (): dbConfigType => {
    //const env = process.env.NODE_ENV || "development";
    return dbConfig.development;
};
