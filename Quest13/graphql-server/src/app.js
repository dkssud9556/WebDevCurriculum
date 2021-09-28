import fastify from "fastify";
import cookie from "fastify-cookie";
import { ApolloServer } from "apollo-server-fastify";

import schema from "./schema/index.js";
import { filesLoader, tabsLoader, userLoader } from "./dataLoader.js";
import sequelize from "./model/index.js";

const server = new ApolloServer({
  schema,
  context: ({ request, reply }) => {
    return {
      loaders: {
        userLoader: userLoader(),
        filesLoader: filesLoader(),
        tabsLoader: tabsLoader(),
      },
      reply,
      token: request.cookies.token,
    };
  },
});

const app = fastify({
  logger: true,
});

app.register(cookie);

(async () => {
  await sequelize.sync({ force: false });
  await server.start();
  app.register(
    server.createHandler({
      cors: { origin: "http://localhost:3000", credentials: true },
    })
  );
  await app.listen(8000);
})();
