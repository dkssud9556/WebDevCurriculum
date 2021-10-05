"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const user_1 = __importDefault(require("./user"));
const file_1 = __importDefault(require("./file"));
const tab_1 = __importDefault(require("./tab"));
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: `${config_1.STORAGE_FOLDER_PATH}/database.sqlite`,
});
(0, user_1.default)(sequelize);
(0, file_1.default)(sequelize);
(0, tab_1.default)(sequelize);
sequelize.models.File.belongsTo(sequelize.models.User, {
    foreignKey: 'username',
    onDelete: 'cascade',
});
sequelize.models.Tab.belongsTo(sequelize.models.User, {
    foreignKey: 'username',
    onDelete: 'cascade',
});
exports.default = sequelize;
//# sourceMappingURL=index.js.map