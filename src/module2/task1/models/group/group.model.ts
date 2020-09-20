import {DataTypes, HasManyAddAssociationMixin, Model, Sequelize} from 'sequelize';
import {GroupPermission} from "./group.types";
import {UserModel} from "../user/user.model";

export class GroupModel extends Model {
  public id!: number;
  public name!: string;
  public permissions!: GroupPermission[];
  public addUser!: HasManyAddAssociationMixin<UserModel, number>;
  public addUsers!: HasManyAddAssociationMixin<UserModel[], number>;
}

export const initGroupModel = (sequelize: Sequelize) => {
    GroupModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      timestamps: false,
    },
  );

  return GroupModel;
};
