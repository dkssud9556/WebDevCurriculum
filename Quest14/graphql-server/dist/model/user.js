"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
exports.default = (sequelize) => {
    UserModel.init({
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: false,
        underscored: true,
        indexes: [{ unique: true, fields: ['username'] }],
    });
};
//# sourceMappingURL=user.js.map