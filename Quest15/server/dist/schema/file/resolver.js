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
const wrapException_1 = __importDefault(require("../../middleware/wrapException"));
const jwtCheck_1 = __importDefault(require("../../middleware/jwtCheck"));
exports.default = {
    Query: {
        files: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const files = yield context.services.fileService.getFiles(username);
            return {
                __typename: "FilesSuccess",
                message: "Files success",
                files,
            };
        }))),
        file: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const { fileName } = args;
            const file = yield context.services.fileService.getFile({ username, fileName });
            return {
                __typename: "FileSuccess",
                message: "File success",
                file,
            };
        }))),
    },
    Mutation: {
        saveFile: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const { fileName, content } = args;
            yield context.services.fileService.saveFile({ username, fileName, content });
            return {
                __typename: "SaveFileSuccess",
                message: "Save file success",
            };
        }))),
        updateFileContent: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const { fileName, content } = args;
            yield context.services.fileService.updateFile({ username, fileName, content });
            return {
                __typename: "UpdateFileContentSuccess",
                message: "Update file content success",
            };
        }))),
        deleteFile: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const { fileName } = args;
            yield context.services.fileService.deleteFile({ username, fileName });
            return {
                __typename: "DeleteFileSuccess",
                message: "Delete file success",
            };
        }))),
        renameFile: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const { fileName, newFileName } = args;
            yield context.services.fileService.renameFile({ username, fileName, newFileName });
            return {
                __typename: "RenameFileSuccess",
                message: "Rename file success",
            };
        }))),
    },
    File: {
        user: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.loaders.userLoader.load(parent.username);
        }),
    },
};
//# sourceMappingURL=resolver.js.map