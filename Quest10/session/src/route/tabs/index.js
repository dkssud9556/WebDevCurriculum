import sessionCheck from "../../middleware/sessionCheck.js";
import tabService from "../../service/tab.js";
import { updateTabStatusSchema } from "./schema/index.js";

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/",
      method: "GET",
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { username } = request.session;
        return tabService.getTabStatus(username);
      },
    })
    .route({
      url: "/",
      method: "PATCH",
      schema: updateTabStatusSchema,
      preHandler: sessionCheck,
      handler: async (request, reply) => {
        const { username } = request.session;
        const { openTabs, selectedTab } = request.body;
        await tabService.updateTabStatus({ username, openTabs, selectedTab });
        reply.send();
      },
    });
  next();
};
