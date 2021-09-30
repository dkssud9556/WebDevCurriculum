"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("./businessError"));
class UsernameDuplicationError extends businessError_1.default {
    constructor() {
        super('UsernameDuplication', 409, 'Username is duplicated');
    }
}
exports.default = UsernameDuplicationError;
//# sourceMappingURL=usernameDuplication.js.map