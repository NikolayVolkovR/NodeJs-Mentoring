import { Op } from 'sequelize';
import { UserCreateProps, UserUpdateProps, User } from '../models';
import { db } from '../database/db';
import { NotFoundError } from '../errors';

export interface UserRepositoryType {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    getSuggest(limit: number, login: string): Promise<User[]>;
    create(props: UserCreateProps): Promise<User>;
    update(id: number, data: UserUpdateProps): Promise<User>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
}

export class UserRepository implements UserRepositoryType {
    private model;

    constructor() {
        this.model = db.User;
    }

    async getAll(): Promise<User[]> {
        return await this.model.findAll({
            order: ['id'],
        });
    }

    async getById(id: number): Promise<User> {
        const user = await this.model.findByPk(id);

        if (user === null) {
            throw new NotFoundError(`User ${id} not found`);
        }

        return user;
    }

    async getSuggest(limit: number, login: string): Promise<User[]> {
        return await this.model.findAll({
            where: {
                login: {
                    [Op.like]: `%${login}%`,
                },
            },
            limit: limit,
            order: ['id'],
        });
    }

    async create({ login, password, age }: UserCreateProps): Promise<User> {
        return await this.model.create({ login, password, age });
    }

    async update(id: number, data: UserUpdateProps): Promise<User> {
        const user = await this.model.findByPk(id);

        if (user === null) {
            throw new NotFoundError(`User ${id} not found`);
        }

        Object.assign(user, data);

        return await user.save();
    }

    async delete(id: number): Promise<void> {
        const user = await this.model.findByPk(id);

        if (user === null) {
            throw new NotFoundError(`User ${id} not found`);
        }

        return await user.destroy();
    }

    async checkExists(id: number): Promise<boolean> {
        return (await this.model.findByPk(id)) !== null;
    }
}
