import jwt from "jsonwebtoken";

import authService from "../../service/auth.js";
import wrapException from "../../middleware/wrapException.js";
import { JWT_SECRET } from "../../config.js";

export default {
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

  User: {
    files: async (parent, args, context) => {
      return context.loaders.filesLoader.load(parent.username);
    },

    tabs: async (parent, args, context) => {
      return context.loaders.tabsLoader.load(parent.username);
    },
  },
};