import fileService from "../../service/file.js";
import {
  saveFileSchema,
  existsFileSchema,
  getContentSchema,
  updateFileContentSchema,
  deleteFileSchema,
  updateFileNameSchema,
} from "./schema/index.js";
import jwtCheck from "../../middleware/jwtCheck.js";

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/name",
      method: "GET",
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { username } = request.payload;
        return fileService.getFileNames(username);
      },
    })
    .route({
      url: "/:fileName/existence",
      method: "GET",
      schema: existsFileSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.payload;
        return fileService.exists({ fileName, username });
      },
    })
    .route({
      url: "/:fileName/content",
      method: "GET",
      schema: getContentSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.payload;
        return fileService.getContent({ fileName, username });
      },
    })
    .route({
      url: "/",
      method: "POST",
      schema: saveFileSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { fileName, content } = request.body;
        const { username } = request.payload;
        await fileService.saveFile({ fileName, content, username });
        reply.send();
      },
    })
    .route({
      url: "/:fileName/content",
      method: "PATCH",
      schema: updateFileContentSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { content } = request.body;
        const { username } = request.payload;
        await fileService.updateFile({ fileName, content, username });
        reply.send();
      },
    })
    .route({
      url: "/:fileName/file-name",
      method: "PATCH",
      schema: updateFileNameSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { newFileName } = request.body;
        const { username } = request.payload;
        await fileService.renameFile({ fileName, newFileName, username });
        reply.send();
      },
    })
    .route({
      url: "/:fileName",
      method: "DELETE",
      schema: deleteFileSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.payload;
        await fileService.deleteFile({ fileName, username });
        reply.send();
      },
    });
  next();
};
