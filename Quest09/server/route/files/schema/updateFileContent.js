export default {
  body: {
    type: "object",
    properties: {
      content: { type: "string" },
    },
    required: ["content"],
  },
  params: {
    type: "object",
    properties: {
      fileName: { type: "string" },
    },
    required: ["fileName"],
  },
};
