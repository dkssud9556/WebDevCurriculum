import jwt from "jsonwebtoken";

import authService from "../../service/auth.js";
import wrapException from "../../middleware/wrapException.js";
import jwtCheck from "../../middleware/jwtCheck.js";
import { JWT_SECRET } from "../../config.js";

export default {
  Query: {
    user: wrapException(
      jwtCheck(async (parent, args, context) => {
        return {
          __typename: "UserSuccess",
          message: "User success",
          user: context.user,
        };
      })
    ),
  },
  Mutation: {
    login: wrapException(async (parent, args, context) => {
      const { username, password } = args;
      await authService.login({ username, password });
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2d" });
      context.reply.setCookie("token", token, { httpOnly: true, path: "/" });
      return { __typename: "LoginSuccess", message: "Login success" };
    }),
    register: wrapException(async (parent, args, context) => {
      const { username, password } = args;
      await authService.register({ username, password });
      return { __typename: "RegisterSuccess", message: "Register success" };
    }),
    logout: wrapException(async (parent, args, context) => {
      context.reply.clearCookie("token");
      return { __typename: "LogoutSuccess", message: "Logout success" };
    }),
  },
};
