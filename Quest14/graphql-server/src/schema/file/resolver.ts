import wrapException from "@middleware/wrapException";
import jwtCheck from "@middleware/jwtCheck";

export default {
  Query: {
    files: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const files = await context.services.fileService.getFiles(username);
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
        const file = await context.services.fileService.getFile({ username, fileName });
        return {
          __typename: "FileSuccess",
          message: "File success",
          file,
        };
      })
    ),
  },

  Mutation: {
    saveFile: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { fileName, content } = args;
        await context.services.fileService.saveFile({ username, fileName, content });
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
        await context.services.fileService.updateFile({ username, fileName, content });
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
        await context.services.fileService.deleteFile({ username, fileName });
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
        await context.services.fileService.renameFile({ username, fileName, newFileName });
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
