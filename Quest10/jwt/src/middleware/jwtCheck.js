import jwt from "jsonwebtoken";

import UnauthenticatedError from "../error/unauthenticated.js";
import { JWT_SECRET } from "../config.js";

export default (request, reply, done) => {
  if (!request.cookies.token) {
    throw new UnauthenticatedError();
  }
  try {
    request.payload = jwt.verify(request.cookies.token, JWT_SECRET);
    done();
  } catch (err) {
    throw new UnauthenticatedError();
  }
};
