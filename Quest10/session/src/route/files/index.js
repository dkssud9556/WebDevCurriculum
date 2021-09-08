import fileService from "../../service/file.js";
import {
  saveFileSchema,
  existsFileSchema,
  getContentSchema,
  updateFileContentSchema,
  deleteFileSchema,
  updateFileNameSchema,
} from "./schema/index.js";
import sessionCheck from "../../middleware/sessionCheck.js";

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/name",
      method: "GET",
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { username } = request.session;
        return fileService.getFileNames(username);
      },
    })
    .route({
      url: "/:fileName/existence",
      method: "GET",
      schema: existsFileSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.session;
        return fileService.exists({ fileName, username });
      },
    })
    .route({
      url: "/:fileName/content",
      method: "GET",
      schema: getContentSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.session;
        return fileService.getContent({ fileName, username });
      },
    })
    .route({
      url: "/",
      method: "POST",
      schema: saveFileSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { fileName, content } = request.body;
        const { username } = request.session;
        await fileService.saveFile({ fileName, content, username });
        reply.send();
      },
    })
    .route({
      url: "/:fileName/content",
      method: "PATCH",
      schema: updateFileContentSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { content } = request.body;
        const { username } = request.session;
        await fileService.updateFile({ fileName, content, username });
        reply.send();
      },
    })
    .route({
      url: "/:fileName/file-name",
      method: "PATCH",
      schema: updateFileNameSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { newFileName } = request.body;
        const { username } = request.session;
        await fileService.renameFile({ fileName, newFileName, username });
        reply.send();
      },
    })
    .route({
      url: "/:fileName",
      method: "DELETE",
      schema: deleteFileSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.session;
        await fileService.deleteFile({ fileName, username });
        reply.send();
      },
    });
  next();
};
