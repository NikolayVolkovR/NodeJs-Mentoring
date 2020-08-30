import { default as User } from '../models/user/user.model';
import { Op } from 'sequelize';
import { userCreateProps } from '@models/user/user.types';

export class UserRepository {
  private model;

  constructor(sequelize, DataTypes) {
    this.model = User(sequelize, DataTypes);
  }

  async getAll() {
    return await this.model.findAll({
        order: ["id"],
    });
  }

  async getById(id: string) {
    return await this.model.findByPk(id);
  }

  async getSuggest(limit: number, login: string) {
    return await this.model.findAll({
      where: {
        login: {
          [Op.like]: `%${login}%`,
        },
      },
      limit: limit,
      order: ["id"],
    });
  }

  async create({ login, password, age }: userCreateProps) {
    return await this.model.create({ login, password, age });
  }

  async update(id, data) {
    const user = await this.model.findByPk(id);

    if (user === null) {
      return null;
    }

    Object.assign(user, data);

    await user.save();
    return user;
  }

  async delete(id) {
      const user = await this.model.findByPk(id);
      return await user.destroy();
  }
}
