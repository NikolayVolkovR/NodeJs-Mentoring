import {Sequelize} from "sequelize";
const sequelize = new Sequelize({
  database: 'test',
  username: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});
import { users } from './users.data';
import { userProps, userUpdateProps } from './user.types';

/*const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test()*/

export abstract class UserModelAbstract {
  abstract getById(userId: string): Promise<userProps>;
  abstract getAll(): Promise<userProps[]>;
  abstract getSuggest(limit: number, login: string): Promise<userProps[]>;
  abstract create(user: userProps):Promise<userProps>
  abstract update(user: userProps, data: userUpdateProps):Promise<userProps>
  abstract update(user: userProps):Promise<void>
}

export class UserModel {
  static getById(userId: string): Promise<userProps> {
    return new Promise((resolve) => {
      return resolve(users.find(({ id }) => id === userId));
    });
  }

  static getAll(): Promise<userProps[]> {
    return new Promise((resolve) => {
      return resolve(users);
    });
  }

  static getSuggest(limit: number, login: string): Promise<userProps[]> {
    return new Promise((resolve) => {
      return resolve(
        users
          .filter(({ login: userLogin }) => userLogin.indexOf(login) === 0)
          .slice(0, limit)
          .sort((user1, user2) => user1.login.localeCompare(user2.login)),
      );
    });
  }

  static create(user: userProps): Promise<userProps> {
    users.push(user);
    return new Promise((resolve) => resolve(user));
  }

  static update(user: userProps, data: userUpdateProps): Promise<userProps> {
    const userIndex = users.findIndex(({ id }) => id === user.id);
    const userRecord = {
      ...user,
      ...data,
    };
    users.splice(userIndex, 1, userRecord);

    return new Promise((resolve) => resolve(userRecord));
  }

  static delete(user: userProps): Promise<void> {
    user.isDeleted = true;

    return Promise.resolve();
  }
}
