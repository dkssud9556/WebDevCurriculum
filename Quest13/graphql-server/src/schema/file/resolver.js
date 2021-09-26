import wrapException from "../../middleware/wrapException.js";
import jwtCheck from "../../middleware/jwtCheck.js";
import { fileRepository } from "../../repository/index.js";

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
          file,
        };
      })
    ),
  },
};
