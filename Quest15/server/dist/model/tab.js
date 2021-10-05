"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabModel = void 0;
const sequelize_1 = require("sequelize");
class TabModel extends sequelize_1.Model {
}
exports.TabModel = TabModel;
exports.default = (sequelize) => {
    TabModel.init({
        fileName: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        isSelected: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Tab',
        timestamps: false,
        underscored: true,
        indexes: [{ unique: true, fields: ['username', 'file_name'] }],
    });
};
//# sourceMappingURL=tab.js.map