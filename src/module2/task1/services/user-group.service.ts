import { UserGroupRepositoryType } from '../repositories/user-group.repository';
import logger from "../helpers/logger";

export interface UserGroupServiceType {}

export class UserGroupService implements UserGroupServiceType {
    private repository: UserGroupRepositoryType;

    constructor(repository: UserGroupRepositoryType) {
        logger.info('Creating new UserGroupService instance');
        this.repository = repository;
    }
}
