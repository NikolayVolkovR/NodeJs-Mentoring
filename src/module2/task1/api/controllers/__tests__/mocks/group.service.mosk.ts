import { GroupServiceType } from "../../../../services/group.service";
import { GroupModel } from "../../../../models/group/group.model";
import { GroupCreateProps } from "../../../../models/group/group.types";

const EXISTING_ID = 1;

export const makeTestGroup = async (id: number, name = "Users", permissions = ["READ"]): Promise<unknown> => {
    //todo make correct types
    return Promise.resolve({
        id,
        name,
        permissions,
    });
};

export const makeTestGroups = async () => {
    const groups = [];
    for (let i = 1; i < 4; i++) {
        groups.push(await makeTestGroup(i));
    }

    return Promise.resolve(groups);
};

export const makeAddUserToGroupResponse = async (users: number[], groupId: number) => {
    const arr = [];

    for (let user in users) {
        arr.push({
            GroupId: groupId,
            UserId: user,
        });
    }

    return Promise.resolve(arr);
};

export class GroupServiceMosk implements GroupServiceType {
    async getById(id: number): Promise<GroupModel> {
        return (await makeTestGroup(id)) as GroupModel;
    }

    async getAll(): Promise<GroupModel[] | null> {
        return await makeTestGroups();
    }

    async checkExists(id: number): Promise<boolean> {
        return Promise.resolve(id === EXISTING_ID);
    }

    async create(groupData): Promise<GroupModel> {
        // todo add groupData type
        return (await makeTestGroup(EXISTING_ID, groupData.name, groupData.permissions)) as GroupModel;
    }

    async update(id: number, data): Promise<GroupModel> {
        // todo add data type
        return (await makeTestGroup(id, data.name, data.permissions)) as GroupModel;
    }

    async delete(_: number): Promise<void> {
        return Promise.resolve();
    }

    async addUsers(users: number[], groupId: number) {
        return await makeAddUserToGroupResponse(users, groupId);
    }
}
