import fastify from "fastify";
import cors from "fastify-cors";
import fastifyCookie from "fastify-cookie";
import fs from "fs";

import route from "./route/index.js";
import errorHandler from "./errorHandler.js";
import InvalidParameterError from "./error/invalidParameter.js";
import { CERTIFICATE_PATH, PRIVATE_KEY_PATH } from "./config.js";

const cert = fs.readFileSync(CERTIFICATE_PATH);
const key = fs.readFileSync(PRIVATE_KEY_PATH);

const server = fastify({
  logger: true,
  schemaErrorFormatter: (errors, dataVar) => new InvalidParameterError(),
  https: { key, cert },
});

server.register(cors, { origin: "https://localhost:3000", credentials: true });
server.register(fastifyCookie);
route(server);
server.setErrorHandler(errorHandler);

export default server;
