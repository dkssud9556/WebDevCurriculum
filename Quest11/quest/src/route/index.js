import filesRoute from "./files/index.js";
import authRoute from "./auth/index.js";
import tabsRoute from "./tabs/index.js";

export default (fastify) => {
  fastify.register(filesRoute, { prefix: "/files" });
  fastify.register(authRoute, { prefix: "/auth" });
  fastify.register(tabsRoute, { prefix: "/tabs" });
};
