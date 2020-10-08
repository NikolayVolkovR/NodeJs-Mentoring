import { GroupModel, GroupCreateProps, GroupUpdateProps } from '../models';
import { GroupRepositoryType } from '../repositories/group.repository';
import logger from '../helpers/logger';
import { serviceLoggerDecorator } from "../helpers/decorators/service-logger.decorator";

export interface GroupServiceType {
    getAll(): Promise<GroupModel[] | null>;
    getById(id: number): Promise<GroupModel>;
    create({ name, permissions }: GroupCreateProps): Promise<GroupModel>;
    update(id: number, data: GroupUpdateProps): Promise<GroupModel>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
    addUsers(users: number[], groupId: number);
}

export class GroupService implements GroupServiceType {
    private repository: GroupRepositoryType;

    constructor(repository) {
        logger.info('Creating new GroupService instance');
        this.repository = repository;
    }

    @serviceLoggerDecorator
    async getById(id: number): Promise<GroupModel> {
        return await this.repository.getById(id);
    }

    @serviceLoggerDecorator
    async getAll(): Promise<GroupModel[] | null> {
        return await this.repository.getAll();
    }

    @serviceLoggerDecorator
    async create(groupData: GroupCreateProps): Promise<GroupModel> {
        return await this.repository.create(groupData);
    }

    @serviceLoggerDecorator
    async update(id: number, data: GroupUpdateProps): Promise<GroupModel> {
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
    async addUsers(users: number[], groupId: number) {
        return this.repository.addUsers(users, groupId);
    }
}
