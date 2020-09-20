import { Model, Sequelize } from 'sequelize';

export class UserGroupModel extends Model {}

export const initUserGroupModel = (sequelize: Sequelize) => {
    UserGroupModel.init(
        {},
        {
            sequelize,
            modelName: 'UserGroup',
            timestamps: false,
        },
    );

    return UserGroupModel;
};
