import jwt from "jsonwebtoken";

import UnauthenticatedError from "../error/unauthenticated.js";
import { JWT_SECRET } from "../config.js";
import userRepository from "../repository/user/sequelize.js";

export default async (request, reply, done) => {
  if (!request.cookies.token) {
    throw new UnauthenticatedError();
  }
  try {
    request.payload = jwt.verify(request.cookies.token, JWT_SECRET);
    const user = await userRepository.findByUsername(request.payload.username);
    if (!user) {
      throw new UnauthenticatedError();
    }
    done();
  } catch (err) {
    throw new UnauthenticatedError();
  }
};
