import fastify from "fastify";
import cors from "fastify-cors";

import route from "./route/index.js";
import errorHandler from "./errorHandler.js";
import InvalidParameterError from "./error/invalidParameter.js";

const server = fastify({
  logger: true,
  schemaErrorFormatter: (errors, dataVar) => new InvalidParameterError(),
});

server.register(cors, { origin: "*" });
route(server);
server.setErrorHandler(errorHandler);

export default server;
