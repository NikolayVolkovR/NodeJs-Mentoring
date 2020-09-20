import { UserGroupRepositoryType } from '../repositories/user-group.repository';

export interface UserGroupServiceType {}

export class UserGroupService implements UserGroupServiceType {
    private repository: UserGroupRepositoryType;

    constructor(repository: UserGroupRepositoryType) {
        this.repository = repository;
    }
}
