import wrapException from "@middleware/wrapException";
import jwtCheck from "@middleware/jwtCheck";

export default {
  Query: {
    tabs: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const tabs = await context.services.tabService.getTabs(username);
        return {
          __typename: "TabsSuccess",
          message: "Tabs success",
          tabs,
        };
      })
    ),
  },

  Mutation: {
    updateTabs: wrapException(
      jwtCheck(async (parent, args, context) => {
        const { username } = context.user;
        const { openTabs, selectedTab } = args;
        await context.services.tabService.updateTabStatus({ username, openTabs, selectedTab });
        return {
          __typename: "UpdateTabsSuccess",
          message: "Update tabs success",
        };
      })
    ),
  },

  Tab: {
    user: async (parent, args, context) => {
      return context.loaders.userLoader.load(parent.username);
    },
  },
};
