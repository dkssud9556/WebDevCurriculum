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
const file_1 = require("../../model/file");
const file_2 = __importDefault(require("../../entity/file"));
const sequelize_1 = require("sequelize");
class SequelizeFileRepository {
    findByPk(pk) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_1.FileModel.findOne({ where: pk });
            if (file) {
                const { fileName, username, content } = file;
                return new file_2.default(fileName, username, content);
            }
            return null;
        });
    }
    findAllByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield file_1.FileModel.findAll({ where: { username } });
            return files.map(file => {
                const { fileName, username, content } = file;
                return new file_2.default(fileName, username, content);
            });
        });
    }
    existsByPk(pk) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.findByPk(pk);
            return !!file;
        });
    }
    save({ username, fileName, content }) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_1.FileModel.findOne({ where: { username, fileName } });
            if (file) {
                file.content = content;
                yield file.save();
            }
            else {
                yield file_1.FileModel.create({ username, fileName, content });
            }
        });
    }
    deleteByPk(pk) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_1.FileModel.findOne({ where: pk });
            if (file) {
                yield file.destroy();
            }
        });
    }
    updateFileName({ username, fileName, newFileName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_1.FileModel.findOne({ where: { username, fileName } });
            if (file) {
                yield file_1.FileModel.update({ fileName: newFileName }, { where: { username, fileName } });
            }
        });
    }
    findAllIn(usernames) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield file_1.FileModel.findAll({ where: { username: { [sequelize_1.Op.in]: usernames } } });
            return files.map(file => {
                const { fileName, username, content } = file;
                return new file_2.default(fileName, username, content);
            });
        });
    }
}
exports.default = SequelizeFileRepository;
//# sourceMappingURL=sequelize.js.map