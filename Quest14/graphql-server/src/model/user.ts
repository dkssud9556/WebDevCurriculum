import { Model, Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
    username: string;
    password: string;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
    public username!: string;

    public password!: string;
}

export default (sequelize: Sequelize) => {
  UserModel.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
      underscored: true,
      indexes: [{ unique: true, fields: ['username'] }],
    },
  );
};
