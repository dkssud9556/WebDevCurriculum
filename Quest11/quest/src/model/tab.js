import Sequelize from "sequelize";

class Tab extends Sequelize.Model {}

export default (sequelize) => {
  Tab.init(
    {
      fileName: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      isSelected: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tab",
      timestamps: false,
      underscored: true,
    }
  );
};
