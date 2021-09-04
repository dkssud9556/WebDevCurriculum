import BusinessError from "./error/businessError.js";

export default (error, request, reply) => {
  if (error instanceof BusinessError) {
    return reply
      .code(error.statusCode)
      .send({ statusCode: error.statusCode, message: error.message });
  }
  reply.code(500).send({ statusCode: 500, message: "Internal Server Error" });
};
