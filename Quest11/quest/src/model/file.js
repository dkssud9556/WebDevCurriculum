import Sequelize from "sequelize";

class File extends Sequelize.Model {}

export default (sequelize) => {
  File.init(
    {
      name: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "File",
      timestamps: false,
      underscored: true,
    }
  );
};
