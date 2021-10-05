"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("./businessError"));
class AlreadyAuthenticatedError extends businessError_1.default {
    constructor() {
        super('AlreadyAuthenticated', 409, 'Already authenticated');
    }
}
exports.default = AlreadyAuthenticatedError;
//# sourceMappingURL=alreadyAuthenticated.js.map