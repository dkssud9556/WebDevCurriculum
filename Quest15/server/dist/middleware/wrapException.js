"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessError_1 = __importDefault(require("../error/businessError"));
exports.default = (func) => (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield func(parent, args, context, info);
    }
    catch (err) {
        if (err instanceof businessError_1.default) {
            const { typename, message, statusCode } = err;
            return {
                __typename: typename,
                message,
                statusCode,
            };
        }
        console.log(err);
        throw err;
    }
});
//# sourceMappingURL=wrapException.js.map