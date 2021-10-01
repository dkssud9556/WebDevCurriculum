"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("./businessError"));
class FileNameConflictError extends businessError_1.default {
    constructor() {
        super('FileNameConflict', 409, 'File name conflict');
    }
}
exports.default = FileNameConflictError;
//# sourceMappingURL=fileNameConflict.js.map