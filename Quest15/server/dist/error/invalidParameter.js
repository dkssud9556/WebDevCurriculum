"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("./businessError"));
class InvalidParameterError extends businessError_1.default {
    constructor() {
        super('InvalidParameter', 400, 'Invalid parameter');
    }
}
exports.default = InvalidParameterError;
//# sourceMappingURL=invalidParameter.js.map