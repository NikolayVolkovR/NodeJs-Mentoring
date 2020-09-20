import { GroupModel, GroupCreateProps, GroupUpdateProps } from '../models';
import { GroupRepositoryType } from '../repositories/group.repository';

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
        this.repository = repository;
    }

    async getById(id: number): Promise<GroupModel> {
        return await this.repository.getById(id);
    }

    async getAll(): Promise<GroupModel[] | null> {
        return await this.repository.getAll();
    }

    async create(groupData: GroupCreateProps): Promise<GroupModel> {
        return await this.repository.create(groupData);
    }

    async update(id: number, data: GroupUpdateProps): Promise<GroupModel> {
        return await this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return await this.repository.delete(id);
    }

    async checkExists(id: number): Promise<boolean> {
        return await this.repository.checkExists(id);
    }

    async addUsers(users: number[], groupId: number) {
        return this.repository.addUsers(users, groupId);
    }
}
