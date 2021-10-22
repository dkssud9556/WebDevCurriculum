import wrapException from "@middleware/wrapException";

export default {
  Mutation: {
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
