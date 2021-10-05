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
const bcrypt_1 = __importDefault(require("bcrypt"));
const invalidLoginInfo_1 = __importDefault(require("../error/invalidLoginInfo"));
const usernameDuplication_1 = __importDefault(require("../error/usernameDuplication"));
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(username);
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new invalidLoginInfo_1.default();
            }
        });
    }
    register({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(username);
            if (user) {
                throw new usernameDuplication_1.default();
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            yield this.userRepository.save({
                username,
                password: yield bcrypt_1.default.hash(password, salt),
            });
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.js.map