import { Model, Sequelize, DataTypes, BelongsToManyGetAssociationsMixin, HasManyAddAssociationMixin } from 'sequelize';
import {GroupModel} from "../group/group.model";

/*export interface UserAttributes { // todo можно добавить типы после имплементации основного функционала
    id: number,
    login: string,
    password: string,
    age?: number,
    isDeleted: boolean,
}*/

export class UserModel extends Model {
    public id!: number;
    public login!: string;
    public age: number;
    public isDeleted!: boolean;
    public getGroups!: BelongsToManyGetAssociationsMixin<GroupModel[]>;
    public addGroup!: HasManyAddAssociationMixin<GroupModel, number>;
}

export const initUserModel = (sequelize: Sequelize) => {
    UserModel.init(
        {
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
