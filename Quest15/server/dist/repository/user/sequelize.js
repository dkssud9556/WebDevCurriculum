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
const user_1 = require("../../model/user");
const user_2 = __importDefault(require("../../entity/user"));
const sequelize_1 = require("sequelize");
class SequelizeUserRepository {
    findByPk(pk) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findOne({ where: { username: pk } });
            if (user) {
                return new user_2.default(user.username, user.password);
            }
            return null;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.UserModel.create(user);
        });
    }
    findAllIn(usernames) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.UserModel.findAll({ where: { username: { [sequelize_1.Op.in]: usernames } } });
            return users.map(user => new user_2.default(user.username, user.password));
        });
    }
}
exports.default = SequelizeUserRepository;
//# sourceMappingURL=sequelize.js.map