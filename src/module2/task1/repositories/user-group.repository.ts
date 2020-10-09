import { db } from "../database/db";

export interface UserGroupRepositoryType {}

export class UserGroupRepository implements UserGroupRepositoryType {
    public model;

    constructor() {
        this.model = db.UserGroup;
    }
}
