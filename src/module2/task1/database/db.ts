import { Sequelize } from 'sequelize';
import { initModels } from '../models';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const { User, Group, UserGroup } = initModels(sequelize);

export const db = {
    sequelize,
    Sequelize,
    User,
    Group,
    UserGroup,
};
