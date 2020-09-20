import { Sequelize } from 'sequelize';
import { UserModel, initUserModel } from './user/user.model';
import { GroupModel, initGroupModel } from './group/group.model';
import { initUserGroupModel, UserGroupModel } from './user-group/user-group.model';

export const initModels = (sequelize: Sequelize) => {
    const User = initUserModel(sequelize);
    const Group = initGroupModel(sequelize);
    const UserGroup = initUserGroupModel(sequelize);

    UserModel.belongsToMany(GroupModel, {
        through: UserGroupModel,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    GroupModel.belongsToMany(UserModel, {
        through: UserGroupModel,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    return {
        User,
        Group,
        UserGroup,
    };
};
