import { Model, Sequelize, DataTypes } from 'sequelize';

export interface FileAttributes {
    fileName: string;
    username: string;
    content: string;
}

export class FileModel extends Model<FileAttributes> implements FileAttributes {
    public fileName!: string;

    public username!: string;

    public content!: string;
}

export default (sequelize: Sequelize) => {
  FileModel.init(
    {
      fileName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'File',
      timestamps: false,
      underscored: true,
      indexes: [{ unique: true, fields: ['username', 'file_name'] }],
    },
  );
};
