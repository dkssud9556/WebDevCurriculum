import fileService from "../../service/file.js";
import {
  saveFileSchema,
  existsFileSchema,
  getContentSchema,
  updateFileContentSchema,
  deleteFileSchema,
  updateFileNameSchema,
} from "./schema/index.js";
import UnauthenticatedError from "../../error/unauthenticated.js";

const preHandler = (request, reply, done) => {
  if (!request.session || !request.session.username) {
    throw new UnauthenticatedError();
  }
  done();
};

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/name",
      method: "GET",
      preHandler,
      handler: async (request, reply) => {
        const { username } = request.session;
        return fileService.getFileNames(username);
      },
    })
    .route({
      url: "/:fileName/existence",
      method: "GET",
      schema: existsFileSchema,
      preHandler,
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
      preHandler,
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
      preHandler,
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
      preHandler,
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
      preHandler,
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
      preHandler,
      handler: async (request, reply) => {
        const { fileName } = request.params;
        const { username } = request.session;
        await fileService.deleteFile({ fileName, username });
        reply.send();
      },
    });
  next();
};
