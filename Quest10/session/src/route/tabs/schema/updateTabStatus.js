export default {
  body: {
    type: "object",
    properties: {
      openTabs: { type: "array", items: { type: "string" } },
      selectedTab: { type: "string" },
    },
    required: ["openTabs", "selectedTab"],
  },
};
