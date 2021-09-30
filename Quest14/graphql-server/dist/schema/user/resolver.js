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
const wrapException_1 = __importDefault(require("../../middleware/wrapException"));
const config_1 = require("../../config");
exports.default = {
    Mutation: {
        login: (0, wrapException_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, password } = args;
            yield context.services.authService.login({ username, password });
            const token = jsonwebtoken_1.default.sign({ username }, config_1.JWT_SECRET, { expiresIn: "2d" });
            context.reply.setCookie("token", token, { httpOnly: true, path: "/" });
            return { __typename: "LoginSuccess", message: "Login success" };
        })),
        register: (0, wrapException_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, password } = args;
            yield context.services.authService.register({ username, password });
            return { __typename: "RegisterSuccess", message: "Register success" };
        })),
        logout: (0, wrapException_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            context.reply.clearCookie("token");
            return { __typename: "LogoutSuccess", message: "Logout success" };
        })),
    },
    User: {
        files: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.loaders.filesLoader.load(parent.username);
        }),
        tabs: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.loaders.tabsLoader.load(parent.username);
        }),
    },
};
//# sourceMappingURL=resolver.js.map