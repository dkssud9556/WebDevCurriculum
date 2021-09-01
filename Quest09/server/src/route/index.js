import filesRoute from "./files/index.js";

export default (fastify) => {
  fastify.register(filesRoute, { prefix: "/files" });
};
