"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("./businessError"));
class UnauthenticatedError extends businessError_1.default {
    constructor() {
        super('Unauthenticated', 403, 'Unauthenticated user');
    }
}
exports.default = UnauthenticatedError;
//# sourceMappingURL=unauthenticated.js.map