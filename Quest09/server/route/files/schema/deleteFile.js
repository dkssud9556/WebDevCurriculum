export default {
  querystring: {
    type: "object",
    properties: {
      fileName: { type: "string" },
    },
    required: ["fileName"],
  },
};
