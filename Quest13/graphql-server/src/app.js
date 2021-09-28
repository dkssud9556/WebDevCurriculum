import fastify from "fastify";
import cookie from "fastify-cookie";
import { ApolloServer } from "apollo-server-fastify";
import bcrypt from "bcrypt";

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
  await sequelize.sync({ force: true });
  await sequelize.models.User.bulkCreate([
    {
      username: "user1",
      password: bcrypt.hashSync("pass1", bcrypt.genSaltSync(10)),
    },
    {
      username: "user2",
      password: bcrypt.hashSync("pass2", bcrypt.genSaltSync(10)),
    },
    {
      username: "user3",
      password: bcrypt.hashSync("pass3", bcrypt.genSaltSync(10)),
    },
  ]);
  await server.start();
  app.register(
    server.createHandler({
      cors: { origin: "http://localhost:3000", credentials: true },
    })
  );
  await app.listen(8000);
})();
