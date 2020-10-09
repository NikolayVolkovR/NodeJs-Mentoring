import { GroupModel, GroupUpdateProps } from "../models";
import { db } from "../database/db";
import { NotFoundError } from "../errors";

export interface GroupRepositoryType {
    getAll(): Promise<GroupModel[] | null>;
    getById(id: number): Promise<GroupModel>;
    create({ name, permissions }: { name: string; permissions: string }): Promise<GroupModel>;
    update(id: number, data: GroupUpdateProps): Promise<GroupModel>;
    delete(id: number): Promise<void>;
    checkExists(id: number): Promise<boolean>;
    addUsers(users: number[], groupId: number);
}

export class GroupRepository implements GroupRepositoryType {
    private model;
    private userModel;

    constructor() {
        this.model = db.Group;
        this.userModel = db.User;
    }

    async getAll(): Promise<GroupModel[] | null> {
        return await this.model.findAll({
            order: ["id"],
        });
    }

    async getById(id: number): Promise<GroupModel> {
        const group = await this.model.findByPk(id);

        if (group === null) {
            throw new NotFoundError(`Group ${id} not found`);
        }

        return group;
    }

    async create({ name, permissions }: { name: string; permissions: string }): Promise<GroupModel> {
        return await this.model.create({ name, permissions });
    }

    async update(id: number, data: GroupUpdateProps): Promise<GroupModel> {
        const group = await this.model.findByPk(id);

        if (group === null) {
            throw new NotFoundError(`Group ${id} not found`);
        }

        Object.assign(group, data);

        return await group.save();
    }

    async delete(id: number): Promise<void> {
        const group = await this.model.findByPk(id);

        if (group === null) {
            throw new NotFoundError(`Group ${id} not found`);
        }

        return await group.destroy();
    }

    async checkExists(id: number): Promise<boolean> {
        return (await this.model.findByPk(id)) !== null;
    }

    async addUsers(users: number[], groupId: number) {
        let arr = [];

        for (let userId of users) {
            const user = await this.userModel.findByPk(userId);

            if (user === null) {
                throw new NotFoundError(`User ${userId} not found`);
            }

            arr.push(user);
        }

        const group = await this.model.findByPk(groupId);

        if (group === null) {
            throw new NotFoundError(`Group ${groupId} not found`);
        }

        return await group.addUsers(arr);
    }
}
