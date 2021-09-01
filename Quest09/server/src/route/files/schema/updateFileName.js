export default {
  body: {
    type: "object",
    properties: {
      newFileName: { type: "string" },
    },
    required: ["newFileName"],
  },
  params: {
    type: "object",
    properties: {
      fileName: { type: "string" },
    },
    required: ["fileName"],
  },
};
