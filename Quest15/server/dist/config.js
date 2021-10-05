"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON_FILES_PATH = exports.STORAGE_FOLDER_PATH = exports.JWT_SECRET = void 0;
const path_1 = __importDefault(require("path"));
exports.JWT_SECRET = "jwtsecret";
exports.STORAGE_FOLDER_PATH = `${path_1.default.resolve()}/storage`;
exports.JSON_FILES_PATH = `${exports.STORAGE_FOLDER_PATH}/files.json`;
//# sourceMappingURL=config.js.map