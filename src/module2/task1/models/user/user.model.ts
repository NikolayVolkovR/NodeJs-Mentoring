import { users } from './users.data';
import { userCreateProps, userProps, userUpdateProps } from './user.types';

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
          .filter(({ login }) => login.indexOf(login) === 0)
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
