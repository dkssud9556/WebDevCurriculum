import fileService from "../../service/file.js";
import {
  saveFileSchema,
  existsFileSchema,
  getContentSchema,
  updateFileContentSchema,
  deleteFileSchema,
  updateFileNameSchema,
} from "./schema/index.js";

export default (fastify, opts, next) => {
  fastify
    .get("/name", async (request, reply) => {
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
    .patch(
      "/:fileName/content",
      { schema: updateFileContentSchema },
      async (request, reply) => {
        const { fileName } = request.params;
        const { content } = request.body;
        await fileService.updateFile({ fileName, content });
        reply.send();
      }
    )
    .delete("/", { schema: deleteFileSchema }, async (request, reply) => {
      await fileService.deleteFile(request.query.fileName);
      reply.send();
    })
    .patch(
      "/:fileName/fileName",
      { schema: updateFileNameSchema },
      async (request, reply) => {
        const { fileName } = request.params;
        const { newFileName } = request.body;
        await fileService.renameFile({ fileName, newFileName });
        reply.send();
      }
    );
  next();
};
