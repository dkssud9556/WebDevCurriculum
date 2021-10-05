"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.tabService = exports.fileService = exports.authService = void 0;
const auth_1 = __importDefault(require("./auth"));
const file_1 = __importDefault(require("./file"));
const tab_1 = __importDefault(require("./tab"));
const user_1 = __importDefault(require("./user"));
const index_1 = require("../repository/index");
exports.authService = new auth_1.default(index_1.userRepository);
exports.fileService = new file_1.default(index_1.fileRepository);
exports.tabService = new tab_1.default(index_1.tabRepository);
exports.userService = new user_1.default(index_1.userRepository);
//# sourceMappingURL=index.js.map