import jwt from "jsonwebtoken";

import authService from "../../service/auth.js";
import wrapException from "../../middleware/wrapException.js";
import jwtCheck from "../../middleware/jwtCheck.js";
import UnauthenticatedError from "../../error/unauthenticated.js";
import { JWT_SECRET } from "../../config.js";

export default {
  Query: {
    user: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = args;
        if (context.payload.username !== username) {
          throw new UnauthenticatedError();
        }
        return context.loaders.usersLoader.load(username);
      })
    ),
  },
  Mutation: {
    login: wrapException(async (parent, args, context) => {
      const { username, password } = args;
      await authService.login({ username, password });
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
      context.reply.setCookie("token", token, { httpOnly: true, path: "/" });
      return { __typename: "LoginSuccess", message: "Login success" };
    }),
  },
};
