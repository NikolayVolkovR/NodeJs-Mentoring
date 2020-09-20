import { UserCreateProps, UserUpdateProps, User } from '../models/user/user.types';
import { UserRepositoryType } from '../repositories/user.repository';

export interface UserServiceType {
    getAll(): Promise<User[] | null>;
    getById(id: number): Promise<User>;
    getSuggest(limit: number, login: string): Promise<User[] | null>;
    create(props: UserCreateProps): Promise<User>;
    update(id: number, data: UserUpdateProps): Promise<User>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
}

export class UserService implements UserServiceType {
    private repository: UserRepositoryType;

    constructor(repository) {
        this.repository = repository;
    }

    async getById(id: number): Promise<User> {
        return await this.repository.getById(id);
    }

    async getAll(): Promise<User[] | null> {
        return await this.repository.getAll();
    }

    async getSuggest(limit: number, login: string): Promise<User[] | null> {
        return await this.repository.getSuggest(limit, login);
    }

    async create(userDate: UserCreateProps): Promise<User> {
        return await this.repository.create(userDate);
    }

    async update(id: number, data: UserUpdateProps): Promise<User> {
        return await this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return await this.repository.delete(id);
    }

    async checkExists(id: number): Promise<boolean> {
        return await this.repository.checkExists(id);
    }
}
