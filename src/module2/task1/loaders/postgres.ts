import { Sequelize, DataTypes } from 'sequelize';
// import { Client } from 'pg';

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
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.dropTable('Users');

  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  await queryInterface.bulkInsert('Users', [
    {
      login: 'Maria',
      password: 'MariaPassword1',
      age: 18,
    },
    {
      login: 'Pavel',
      password: 'PavelPassword1',
      age: 30,
    },
    {
      login: 'Evgeny',
      password: 'EvgenyPassword1',
      age: 45,
    },
  ]);

  /*const db = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'test',
  });

  await db.connect();
  client
      .query("SELECT EXISTS (SELECT * FROM pg_class WHERE relname = 'Users')")
      .then(res => console.log(res.rows[0].exists))
      .catch(e => console.error(e.stack))
  client
      .query('SELECT * FROM "Users"')
      .then((res) => console.log(res))
      .catch(e => console.error('===ERROR===', e.stack))
  db
      .query('DROP TABLE IF EXISTS "Users"')
      .query('')
      .then((res) => console.log(res))
      .catch(e => console.error('===ERROR===', e.stack))
  const insertUsersQuery = {
    text: 'INSERT INTO "Users"(login, password, age) VALUES($1, $2, $3)',
    values: ['Max', 'MaxPassword1', 50],
  };

  // await db.query('DROP TABLE IF EXISTS "Users"');
  db
      .query('CREATE TABLE users ()')
      .then(res => console.log(res))
      .catch( e => console.log(e.stack));
  // await db.query(insertUsersQuery);

  const users = await db.query('FIND * FROM "Users"')*/
};
