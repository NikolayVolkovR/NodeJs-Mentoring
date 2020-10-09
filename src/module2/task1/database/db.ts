import { Sequelize } from "sequelize";
import { initModels } from "../models";
import { getDbConfig } from "../config";

const config = getDbConfig();
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const { User, Group, UserGroup } = initModels(sequelize);

export const db = {
    sequelize,
    Sequelize,
    User,
    Group,
    UserGroup,
};
