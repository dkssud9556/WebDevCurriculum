"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const sequelize_1 = require("sequelize");
class FileModel extends sequelize_1.Model {
}
exports.FileModel = FileModel;
exports.default = (sequelize) => {
    FileModel.init({
        fileName: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'File',
        timestamps: false,
        underscored: true,
        indexes: [{ unique: true, fields: ['username', 'file_name'] }],
    });
};
//# sourceMappingURL=file.js.map