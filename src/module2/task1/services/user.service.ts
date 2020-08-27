import { v4 as uuidv4 } from 'uuid';
import { ErrorRequestHandler } from 'express';
import { userCreateProps, userUpdateProps, userProps } from '../models/user/user.types';
import { UserModel, UserModelAbstract } from '../models/user/user.model';

export class UserService {
  private userModel: UserModelAbstract;

  constructor(userModel) {
    this.userModel = userModel;
  }

  async getById(id: string): Promise<userProps> {
    return await UserModel.getById(id);
  }

  async getAll(): Promise<userProps[]> {
    return await UserModel.getAll();
  }

  async getSuggest(limit: number, login: string): Promise<userProps[]> {
    return await UserModel.getSuggest(limit, login);
  }

  async create({ login, password, age }: userCreateProps): Promise<userProps> {
    const user: userProps = {
      id: uuidv4(),
      login,
      password,
      age,
      isDeleted: false,
    };

    return await UserModel.create(user);
  }

  async update(userId, data: userUpdateProps): Promise<userProps> {
    const user = await UserModel.getById(userId);

    if (user === undefined) {
      return undefined;
    }

    return await UserModel.update(user, data);
  }

  async delete(user: userProps): Promise<void> {
    await UserModel.delete(user);
  }
}

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500).render('error', { error: err });
};
