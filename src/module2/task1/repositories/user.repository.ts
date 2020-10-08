import Model, { Op } from 'sequelize';
import { UserCreateAttributes, UserUpdateAttributes, UserAttributes, UserModel } from '../models';
import { db } from '../database/db';
import { NotFoundError, UnauthorizedError } from '../errors';

export interface UserRepositoryType {
    getAll(): Promise<UserAttributes[]>;
    getById(id: number): Promise<UserAttributes>;
    getSuggest(limit: number, login: string): Promise<UserAttributes[]>;
    create(props: UserCreateAttributes): Promise<UserAttributes>;
    update(id: number, data: UserUpdateAttributes): Promise<UserAttributes>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
    getByLoginPassword(login: string, password: string): Promise<UserModel>;
}

export class UserRepository implements UserRepositoryType {
    private model;

    constructor() {
        this.model = db.User;
    }

    async getAll(): Promise<UserAttributes[]> {
        return await this.model.findAll({
            order: ['id'],
        });
    }

    async getById(id: number): Promise<UserAttributes> {
        const user = await this.model.findByPk(id);

        if (user === null) {
            throw new NotFoundError(`Not found User with id ${id}`);
        }

        return user;
    }

    async getSuggest(limit: number, login: string): Promise<UserAttributes[]> {
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

    async create({ login, password, age }: UserCreateAttributes): Promise<UserAttributes> {
        return await this.model.create({ login, password, age });
    }

    async update(id: number, data: UserUpdateAttributes): Promise<UserAttributes> {
        const user = await this.model.findByPk(id);

        if (user === null) {
            throw new NotFoundError(`UserAttributes ${id} not found`);
        }

        Object.assign(user, data);

        return await user.save();
    }

    async delete(id: number): Promise<void> {
        const user = await this.model.findByPk(id);

        if (user === null) {
            throw new NotFoundError(`UserAttributes ${id} not found`);
        }

        return await user.destroy();
    }

    async checkExists(id: number): Promise<boolean> {
        return (await this.model.findByPk(id)) !== null;
    }

    async getByLoginPassword(login: string, password: string): Promise<UserModel> {
        const user = await this.model.findOne({
            where: {
                login,
                password,
            },
        });

        if (user === null) {
            throw new UnauthorizedError('Bad login/password combination');
        }

        if (user.isDeleted) {
            throw new NotFoundError('User is deleted');
        }

        return user;
    }
}
