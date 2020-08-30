import { userCreateProps, userUpdateProps, userProps } from '../models/user/user.types';

export class UserService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  async getById(id: string): Promise<userProps> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<userProps[]> {
    return await this.repository.getAll();
  }

  async getSuggest(limit: number, login: string): Promise<userProps[]> {
    return await this.repository.getSuggest(limit, login);
  }

  async create(userDate: userCreateProps): Promise<userProps> {
    return await this.repository.create(userDate);
  }

  async update(userId, data: userUpdateProps): Promise<userProps> {
    return await this.repository.update(userId, data);
  }

  async delete(userId: string): Promise<void> {
    return await this.repository.delete(userId);
  }
}
