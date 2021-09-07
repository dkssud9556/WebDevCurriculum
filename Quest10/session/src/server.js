import fastify from "fastify";
import cors from "fastify-cors";
import fastifyCookie from "fastify-cookie";
import fastifySession from "fastify-session";

import route from "./route/index.js";
import errorHandler from "./errorHandler.js";
import InvalidParameterError from "./error/invalidParameter.js";

const server = fastify({
  logger: true,
  schemaErrorFormatter: (errors, dataVar) => new InvalidParameterError(),
});

server.register(cors, { origin: "http://localhost:3000", credentials: true });
server.register(fastifyCookie);
server.register(fastifySession, {
  secret: "secretsecretsecretsecretsecretsecretsecretsecret",
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    path: "/",
  },
  resave: false,
  saveUninitialized: false,
});
route(server);
server.setErrorHandler(errorHandler);

export default server;
