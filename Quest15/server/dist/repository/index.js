"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.tabRepository = exports.fileRepository = void 0;
const sequelize_1 = __importDefault(require("./file/sequelize"));
const sequelize_2 = __importDefault(require("./tab/sequelize"));
const sequelize_3 = __importDefault(require("./user/sequelize"));
exports.fileRepository = new sequelize_1.default();
exports.tabRepository = new sequelize_2.default();
exports.userRepository = new sequelize_3.default();
//# sourceMappingURL=index.js.map