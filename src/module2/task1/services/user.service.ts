import { UserCreateProps, UserUpdateProps, User } from '../models/user/user.types';
import { UserRepositoryType } from '../repositories/user.repository';
import logger from '../logger';

export interface UserServiceType {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    getSuggest(limit: number, login: string): Promise<User[]>;
    create(props: UserCreateProps): Promise<User>;
    update(id: number, data: UserUpdateProps): Promise<User>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
}

export class UserService implements UserServiceType {
    private repository: UserRepositoryType;

    constructor(repository) {
        logger.info('Creating new UserService instance');
        this.repository = repository;
    }

    async getById(id: number): Promise<User> {
        logger.info('Calling UserService.getById()', {
            arguments: { id },
        });

        const user = await this.repository.getById(id);

        if (user === null) {
            throw new Error('no user here...')
        }

        return user;
    }

    async getAll(): Promise<User[]> {
        logger.info('Calling UserService.getAll()', );

        return await this.repository.getAll();
    }

    async getSuggest(limit: number, login: string): Promise<User[] | null> {
        logger.info('Calling UserService.getSuggest()', {
            arguments: { limit, login },
        });

        return await this.repository.getSuggest(limit, login);
    }

    async create(userDate: UserCreateProps): Promise<User> {
        logger.info('Calling UserService.create()', {
            arguments: { userDate },
        });

        return await this.repository.create(userDate);
    }

    async update(id: number, data: UserUpdateProps): Promise<User> {
        logger.info('Calling UserService.update()', {
            arguments: { id, data },
        });

        return await this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        logger.info('Calling UserService.delete()', {
            arguments: { id },
        });

        return await this.repository.delete(id);
    }

    async checkExists(id: number): Promise<boolean> {
        logger.info('Calling UserService.checkExists()', {
            arguments: { id },
        });

        return await this.repository.checkExists(id);
    }
}
