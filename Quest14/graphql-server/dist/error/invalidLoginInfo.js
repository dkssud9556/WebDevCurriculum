"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("./businessError"));
class InvalidLoginInfoError extends businessError_1.default {
    constructor() {
        super('InvalidLoginInfo', 403, 'Invalid login info');
    }
}
exports.default = InvalidLoginInfoError;
//# sourceMappingURL=invalidLoginInfo.js.map