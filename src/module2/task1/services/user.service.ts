import { UserAttributes, UserCreateAttributes, UserUpdateAttributes } from '../models/user/user.types';
import { UserRepositoryType } from '../repositories/user.repository';
import logger from '../helpers/logger';
import { serviceLoggerDecorator } from '../helpers/decorators/service-logger.decorator';
import jwt from 'jsonwebtoken';

export interface UserServiceType {
    getAll(): Promise<UserAttributes[]>;
    getById(id: number): Promise<UserAttributes>;
    getSuggest(limit: number, login: string): Promise<UserAttributes[]>;
    create(props: UserCreateAttributes): Promise<UserAttributes>;
    update(id: number, data: UserUpdateAttributes): Promise<UserAttributes>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
    getAuthToken(login: string, password: string): Promise<string>;
}

export class UserService implements UserServiceType {
    private repository: UserRepositoryType;

    constructor(repository) {
        logger.info('Creating new UserService instance');
        this.repository = repository;
    }

    @serviceLoggerDecorator
    async getById(id: number): Promise<UserAttributes> {
        return await this.repository.getById(id);
    }

    @serviceLoggerDecorator
    async getAll(): Promise<UserAttributes[]> {
        return await this.repository.getAll();
    }

    @serviceLoggerDecorator
    async getSuggest(limit: number, login: string): Promise<UserAttributes[] | null> {
        return await this.repository.getSuggest(limit, login);
    }

    @serviceLoggerDecorator
    async create(userDate: UserCreateAttributes): Promise<UserAttributes> {
        return await this.repository.create(userDate);
    }

    @serviceLoggerDecorator
    async update(id: number, data: UserUpdateAttributes): Promise<UserAttributes> {
        return await this.repository.update(id, data);
    }

    @serviceLoggerDecorator
    async delete(id: number): Promise<void> {
        return await this.repository.delete(id);
    }

    @serviceLoggerDecorator
    async checkExists(id: number): Promise<boolean> {
        return await this.repository.checkExists(id);
    }

    @serviceLoggerDecorator
    async getAuthToken(login: string, password: string): Promise<string> {
        const user = await this.repository.getByLoginPassword(login, password);
        const payload = { userId: user.id };
        const secret = process.env.JWT_SECRET_ENV;
        const expiresIn = parseInt(process.env.JWT_EXPIRES_ENV);

        return jwt.sign(payload, secret, { expiresIn });
    }
}
