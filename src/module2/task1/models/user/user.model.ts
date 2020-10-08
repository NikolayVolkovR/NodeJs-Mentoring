import {
    Model,
    ModelDefined,
    Sequelize,
    DataTypes,
    BelongsToManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    Association,
} from 'sequelize';
import { GroupModel } from '../group/group.model';
import { UserAttributes, UserCreateAttributes } from './user.types';

export class UserModel extends Model<UserAttributes, UserCreateAttributes> implements UserAttributes {
    public id!: number;
    public login!: string;
    public age!: number;
    public isDeleted!: boolean;
    public password!: string;
    public getGroups!: BelongsToManyGetAssociationsMixin<GroupModel[]>;
    public addGroup!: HasManyAddAssociationMixin<GroupModel, number>;

    public readonly groups?: GroupModel[];
    public static associations: {
        groups: Association<UserModel, GroupModel>;
    };
}

export const initUserModel = (sequelize: Sequelize) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: false,
        },
    );

    return UserModel;
};
