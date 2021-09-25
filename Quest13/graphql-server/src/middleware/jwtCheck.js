import jwt from "jsonwebtoken";

import UnauthenticatedError from "../error/unauthenticated.js";
import { JWT_SECRET } from "../config.js";
import { userRepository } from "../repository/index.js";

export default (func) => async (parent, args, context, info) => {
  if (!context.token) {
    throw new UnauthenticatedError();
  }
  try {
    context.payload = jwt.verify(context.token, JWT_SECRET);
    const user = await userRepository.findByUsername(context.payload.username);
    if (!user) {
      throw new UnauthenticatedError();
    }
    return await func(parent, args, context, info);
  } catch (err) {
    throw err;
  }
};
