import Sequelize from "sequelize";

class User extends Sequelize.Model {}

export default (sequelize) => {
  User.init(
    {
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      underscored: true,
      indexes: [{ unique: true, fields: ["username"] }],
    }
  );
};
