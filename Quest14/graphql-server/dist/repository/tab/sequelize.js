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
const tab_1 = require("../../model/tab");
const tab_2 = __importDefault(require("../../entity/tab"));
const sequelize_1 = require("sequelize");
class SequelizeTabRepository {
    findAllByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield tab_1.TabModel.findAll({ where: { username } });
            return tabs.map(tab => {
                const { fileName, username, isSelected } = tab;
                return new tab_2.default(fileName, username, isSelected);
            });
        });
    }
    save({ username, openTabs, selectedTab }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tab_1.TabModel.destroy({ where: { username } });
            yield tab_1.TabModel.bulkCreate(openTabs.map((tabName) => ({
                username,
                fileName: tabName,
                isSelected: selectedTab === tabName
            })));
        });
    }
    findAllIn(usernames) {
        return __awaiter(this, void 0, void 0, function* () {
            const tabs = yield tab_1.TabModel.findAll({ where: { username: { [sequelize_1.Op.in]: usernames } } });
            return tabs.map(tab => {
                const { fileName, username, isSelected } = tab;
                return new tab_2.default(fileName, username, isSelected);
            });
        });
    }
}
exports.default = SequelizeTabRepository;
//# sourceMappingURL=sequelize.js.map