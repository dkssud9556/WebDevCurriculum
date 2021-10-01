import { Model, Sequelize, DataTypes } from 'sequelize';

export interface TabAttributes {
    fileName: string,
    username: string,
    isSelected: boolean
}

export class TabModel extends Model<TabAttributes> implements TabAttributes {
    public fileName!: string;

    public username!: string;

    public isSelected!: boolean;
}

export default (sequelize: Sequelize) => {
  TabModel.init(
    {
      fileName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      isSelected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tab',
      timestamps: false,
      underscored: true,
      indexes: [{ unique: true, fields: ['username', 'file_name'] }],
    },
  );
};
