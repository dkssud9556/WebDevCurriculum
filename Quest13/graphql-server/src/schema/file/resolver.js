import wrapException from "../../middleware/wrapException.js";
import jwtCheck from "../../middleware/jwtCheck.js";
import { fileRepository } from "../../repository/index.js";
import fileService from "../../service/file.js";

export default {
  Query: {
    files: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const files = await fileRepository.findAllByUsername(username);
        return {
          __typename: "FilesSuccess",
          message: "Files success",
          files,
        };
      })
    ),

    file: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { fileName } = args;
        const file = await fileRepository.findByUsernameAndFileName({
          username,
          fileName,
        });
        return {
          __typename: "FileSuccess",
          message: "File success",
          username,
          fileName,
        };
      })
    ),
  },

  Mutation: {
    saveFile: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { fileName, content } = args;
        await fileService.saveFile({ username, fileName, content });
        return {
          __typename: "SaveFileSuccess",
          message: "Save file success",
        };
      })
    ),

    updateFileContent: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { fileName, content } = args;
        await fileService.updateFile({ username, fileName, content });
        return {
          __typename: "UpdateFileContentSuccess",
          message: "Update file content success",
        };
      })
    ),

    deleteFile: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { fileName } = args;
        await fileService.deleteFile({ username, fileName });
        return {
          __typename: "DeleteFileSuccess",
          message: "Delete file success",
        };
      })
    ),

    renameFile: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { fileName, newFileName } = args;
        await fileService.renameFile({ username, fileName, newFileName });
        return {
          __typename: "RenameFileSuccess",
          message: "Rename file success",
        };
      })
    ),
  },

  File: {
    user: async (parent, args, context) => {
      return context.loaders.userLoader.load(parent.username);
    },
  },
};
