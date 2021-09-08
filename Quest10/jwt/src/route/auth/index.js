import jwt from "jsonwebtoken";

import authService from "../../service/auth.js";
import { loginSchema } from "./schema/index.js";
import jwtCheck from "../../middleware/jwtCheck.js";

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/login",
      method: "POST",
      schema: loginSchema,
      handler: async (request, reply) => {
        await authService.login(request.body);
        const token = jwt.sign(
          { username: request.body.username },
          "jwtsecret",
          {
            expiresIn: "2h",
          }
        );
        reply.setCookie("token", token, { httpOnly: true, path: "/" }).send();
      },
    })
    .route({
      url: "/logout",
      method: "POST",
      preHandler: jwtCheck,
      handler: (request, reply) => {
        reply.clearCookie("token").send();
      },
    });
  next();
};
