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
exports.tabsLoader = exports.filesLoader = exports.userLoader = void 0;
const index_1 = __importDefault(require("dataloader/index"));
const index_2 = require("./repository/index");
const userLoader = () => new index_1.default((usernames) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_2.userRepository.findAllIn(usernames);
    return usernames.map((username) => users.find((user) => user.username === username));
}));
exports.userLoader = userLoader;
const filesLoader = () => new index_1.default((usernames) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield index_2.fileRepository.findAllIn(usernames);
    return usernames.map((username) => files.filter((file) => file.username === username));
}));
exports.filesLoader = filesLoader;
const tabsLoader = () => new index_1.default((usernames) => __awaiter(void 0, void 0, void 0, function* () {
    const tabs = yield index_2.tabRepository.findAllIn(usernames);
    return usernames.map((username) => tabs.filter((tab) => tab.username === username));
}));
exports.tabsLoader = tabsLoader;
//# sourceMappingURL=dataLoader.js.map