/*import { Sequelize, DataTypes, QueryInterface } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let connection;
if (config.use_env_variable) {
    connection = new Sequelize(process.env[config.use_env_variable], config);
} else {
    connection = new Sequelize(config.database, config.username, config.password, config);
}

export const sequelize = connection;*/

/*
// QueryInterface way:

const dropTables = async (queryInterface: QueryInterface): Promise<[void, void]> => {
  await queryInterface.dropTable('UserGroup');
  await queryInterface.dropTable('Groups');
  return Promise.all([queryInterface.dropTable('Users'), queryInterface.dropTable('Permission')]);
};

const createUsers = async (queryInterface: QueryInterface): Promise<void> => {
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
};

const createGroups = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('Groups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  await queryInterface.bulkInsert('Groups', [
    {
      name: 'User',
      permissions: '[READ]'
    },
    {
      name: 'Developer',
      permissions: '[READ, WRITE]'
    },
    {
      name: 'Admin',
      permissions: '[READ, DELETE]'
    },
  ]);
};

const createUserGroup = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('UserGroup', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
      },
      onDelete: 'cascade',
    },
  });
};*/

export const initTables = async () => {
    /*
  QueryInterface way:
  const queryInterface = sequelize.getQueryInterface();
  await dropTables(queryInterface);
  await Promise.all([createUsers(queryInterface), createGroups(queryInterface)]);
  await createUserGroup(queryInterface);*/
};
