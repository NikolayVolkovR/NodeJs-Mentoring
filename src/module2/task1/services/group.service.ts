import { GroupModel, GroupCreateProps, GroupUpdateProps } from '../models';
import { GroupRepositoryType } from '../repositories/group.repository';
import logger from '../logger';

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

    async getById(id: number): Promise<GroupModel> {
        logger.info('Calling GroupService.getById()', {
            arguments: { id },
        });
        return await this.repository.getById(id);
    }

    async getAll(): Promise<GroupModel[] | null> {
        logger.info('Calling GroupService.getAll()', {
            arguments: {},
        });
        return await this.repository.getAll();
    }

    async create(groupData: GroupCreateProps): Promise<GroupModel> {
        logger.info('Calling GroupService.create()', {
            arguments: { groupData },
        });
        return await this.repository.create(groupData);
    }

    async update(id: number, data: GroupUpdateProps): Promise<GroupModel> {
        logger.info('Calling GroupService.update()', {
            arguments: { id, data },
        });
        return await this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        logger.info('Calling GroupService.delete()', {
            arguments: { id },
        });
        return await this.repository.delete(id);
    }

    async checkExists(id: number): Promise<boolean> {
        logger.info('Calling GroupService.checkExists()', {
            arguments: { id },
        });
        return await this.repository.checkExists(id);
    }

    async addUsers(users: number[], groupId: number) {
        logger.info('Calling GroupService.addUsers()', {
            arguments: { users, groupId },
        });
        return this.repository.addUsers(users, groupId);
    }
}
