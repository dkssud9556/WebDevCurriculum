import fileService from "../../service/file.js";
import {
  saveFileSchema,
  existsFileSchema,
  getContentSchema,
  updateFileSchema,
} from "./schema/index.js";

export default (fastify, opts, next) => {
  fastify
    .get("/name", (request, reply) => {
      return fileService.getFileNames();
    })
    .get("/existence", { schema: existsFileSchema }, async (request, reply) => {
      const { fileName } = request.query;
      return fileService.exists(fileName);
    })
    .get(
      "/:fileName/content",
      { schema: getContentSchema },
      async (request, reply) => {
        const { fileName } = request.params;
        return fileService.getContent(fileName);
      }
    )
    .post("/", { schema: saveFileSchema }, async (request, reply) => {
      await fileService.saveFile(request.body);
      reply.send();
    })
    .patch("/", { schema: updateFileSchema }, async (request, reply) => {
      await fileService.updateFile(request.body);
      reply.send();
    });
  next();
};
