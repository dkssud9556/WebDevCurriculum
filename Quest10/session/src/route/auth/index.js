import authService from "../../service/auth.js";
import { loginSchema } from "./schema/index.js";
import AlreadyAuthenticatedError from "../../error/alreadyAuthenticated.js";
import sessionCheck from "../../middleware/sessionCheck.js";

export default (fastify, opts, next) => {
  fastify
    .route({
      url: "/login",
      method: "POST",
      schema: loginSchema,
      preHandler: (request, reply, done) => {
        if (request.session && request.session.username) {
          throw new AlreadyAuthenticatedError();
        }
        done();
      },
      handler: async (request, reply) => {
        await authService.login(request.body);
        request.session.username = request.body.username;
        reply.send();
      },
    })
    .route({
      url: "/logout",
      method: "POST",
      preHandler: sessionCheck,
      handler: (request, reply) => {
        request.sessionStore.destroy(request.session.sessionId, () => {
          request.session = null;
          reply.send();
        });
      },
    });
  next();
};
