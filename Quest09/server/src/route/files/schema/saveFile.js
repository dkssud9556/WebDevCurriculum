export default {
  body: {
    type: "object",
    properties: {
      fileName: { type: "string" },
      content: { type: "string" },
    },
    required: ["fileName", "content"],
  },
};
