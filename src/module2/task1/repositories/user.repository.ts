import { Op } from 'sequelize';
import { UserCreateProps, UserUpdateProps } from '../models/user/user.types';
import { User } from '../models/user/user.types';
import { db } from "../database/db";

export interface UserRepositoryType {
    getAll(): Promise<User[] | null>;
    getById(id: number): Promise<User>;
    getSuggest(limit: number, login: string): Promise<User[] | null>;
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

    async getAll(): Promise<User[] | null> {
        return await this.model.findAll({
            order: ['id'],
        });
    }

    async getById(id: number): Promise<User> {
        return await this.model.findByPk(id);
    }

    async getSuggest(limit: number, login: string): Promise<User[] | null> {
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
            return null;
        }

        Object.assign(user, data);

        return await user.save();
    }

    async delete(id: number): Promise<void> {
        const user = await this.model.findByPk(id);
        return await user.destroy();
    }

    async checkExists(id: number): Promise<boolean> {
        return await this.model.findByPk(id) !== null;
    }
}
