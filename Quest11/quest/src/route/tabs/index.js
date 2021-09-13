import jwtCheck from "../../middleware/jwtCheck.js";
import tabService from "../../service/tab.js";
import { updateTabStatusSchema } from "./schema/index.js";

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/",
      method: "GET",
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { username } = request.payload;
        return tabService.getTabStatus(username);
      },
    })
    .route({
      url: "/",
      method: "PATCH",
      schema: updateTabStatusSchema,
      preHandler: jwtCheck,
      handler: async (request, reply) => {
        const { username } = request.payload;
        const { openTabs, selectedTab } = request.body;
        await tabService.updateTabStatus({ username, openTabs, selectedTab });
        reply.send();
      },
    });
  next();
};
