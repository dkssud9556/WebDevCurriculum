import 'reflect-metadata'
import fastify from "fastify";
import cookie from "fastify-cookie";
import {ApolloServer} from "apollo-server-fastify";
import bcrypt from "bcrypt";

import sequelize from "@model/index";
import schema from "@src/schema";
import {filesLoader, tabsLoader, userLoader} from "@util/dataLoader";
import services from "@src/service";

const server = new ApolloServer({
  schema,
  context: ({ request, reply }) => {
    return {
      loaders: {
        userLoader: userLoader(),
        filesLoader: filesLoader(),
        tabsLoader: tabsLoader()
      },
      services,
      reply,
      request,
      token: request.cookies.token
    }
  }
});

const app = fastify({
  logger: true
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
      cors: { origin: "*", credentials: true },
    })
  );
  await app.listen(8000, '0.0.0.0');
})();
