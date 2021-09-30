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
const fileNameConflict_1 = __importDefault(require("../error/fileNameConflict"));
const fileNotFound_1 = __importDefault(require("../error/fileNotFound"));
class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    getFiles(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fileRepository.findAllByUsername(username);
        });
    }
    getFile({ username, fileName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fileRepository.findByPk({
                username,
                fileName,
            });
        });
    }
    saveFile(fileInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileName, username, content } = fileInfo;
            if (yield this.fileRepository.existsByPk({
                fileName,
                username,
            })) {
                throw new fileNameConflict_1.default();
            }
            yield this.fileRepository.save({ username, fileName, content });
        });
    }
    updateFile(updateInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileName, username, content } = updateInfo;
            if (!(yield this.fileRepository.existsByPk({
                fileName,
                username,
            }))) {
                throw new fileNotFound_1.default();
            }
            yield this.fileRepository.save({ username, fileName, content });
        });
    }
    deleteFile({ username, fileName }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.fileRepository.existsByPk({
                username,
                fileName,
            }))) {
                throw new fileNotFound_1.default();
            }
            yield this.fileRepository.deleteByPk({
                username,
                fileName,
            });
        });
    }
    renameFile(renameInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, fileName, newFileName } = renameInfo;
            if (!(yield this.fileRepository.existsByPk({
                username,
                fileName,
            }))) {
                throw new fileNotFound_1.default();
            }
            if (yield this.fileRepository.existsByPk({
                fileName: newFileName,
                username,
            })) {
                throw new fileNameConflict_1.default();
            }
            yield this.fileRepository.updateFileName({
                username,
                fileName,
                newFileName,
            });
        });
    }
}
exports.default = FileService;
//# sourceMappingURL=file.js.map