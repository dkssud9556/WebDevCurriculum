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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = __importDefault(require("../error/unauthenticated"));
const config_1 = require("../config");
exports.default = (func) => (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.token) {
        throw new unauthenticated_1.default();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(context.token, config_1.JWT_SECRET);
        const user = yield context.services.userService.getUser(payload.username);
        if (!user) {
            throw new unauthenticated_1.default();
        }
        context.user = payload;
    }
    catch (err) {
        throw new unauthenticated_1.default();
    }
    return func(parent, args, context, info);
});
//# sourceMappingURL=jwtCheck.js.map