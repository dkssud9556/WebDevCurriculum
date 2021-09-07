import filesRoute from "./files/index.js";
import authRoute from "./auth/index.js";

export default (fastify) => {
  fastify.register(filesRoute, { prefix: "/files" });
  fastify.register(authRoute, { prefix: "/auth" });
};
