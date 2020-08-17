import { users } from '../models/user/users.data';
import { v4 as uuidv4 } from 'uuid';
import { ErrorRequestHandler } from 'express';
import { userCreateProps, userUpdateProps, userProps } from '../models/user/user.types';
import { UserModel } from '../models/user/user.model';

export class UserService {
  static async getById(id: string): Promise<userProps> {
    return await UserModel.getById(id);
  }

  static async getAll(): Promise<userProps[]> {
    return await UserModel.getAll();
  }

  static async getSuggest(limit: number, login: string): Promise<userProps[]> {
    return await UserModel.getSuggest(limit, login);
  }

  static async create({ login, password, age }: userCreateProps): Promise<userProps> {
    const user: userProps = {
      id: uuidv4(),
      login,
      password,
      age,
      isDeleted: false,
    };

    return await UserModel.create(user);
  }

  static async update(userId, data: userUpdateProps): Promise<userProps> {
    const user = await UserModel.getById(userId);

    if (user === undefined) {
      return undefined;
    }

    return await UserModel.update(user, data);
  }

  static async delete(userId: string): Promise<void> {
    const user = await UserModel.getById(userId);

    if (user === undefined) {
      return undefined;
    }

    return UserModel.delete(user);
  }
}





export const handleUserDelete = (userId: string) => {
  users.forEach((user) => {
    if (user.id === userId) {
      user.isDeleted = true;
    }
  });
};

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500).render('error', { error: err });
};
