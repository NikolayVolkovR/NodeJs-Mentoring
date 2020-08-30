import { Sequelize } from 'sequelize';
import { Client } from 'pg';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let connection;
if (config.use_env_variable) {
  connection = new Sequelize(process.env[config.use_env_variable], config);
} else {
  connection = new Sequelize(config.database, config.username, config.password, config);
}

export const sequelize = connection;

export const initTable = async () => {
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'test',
  });

  await client.connect();

  client
      .query("SELECT EXISTS (SELECT * FROM pg_class WHERE relname = 'Users')")
      .then(res => console.log(res.rows[0].exists))
      .catch(e => console.error(e.stack))
};
