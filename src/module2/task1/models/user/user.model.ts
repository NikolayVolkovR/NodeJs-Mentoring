import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    public id: number;
    public login: string;
  }

  User.init(
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

  return User;
};


