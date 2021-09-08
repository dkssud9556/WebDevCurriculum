import jwt from "jsonwebtoken";

import UnauthenticatedError from "../error/unauthenticated.js";

export default (request, reply, done) => {
  if (!request.cookies.token) {
    throw new UnauthenticatedError();
  }
  try {
    request.payload = jwt.verify(request.cookies.token, "jwtsecret");
    done();
  } catch (err) {
    throw new UnauthenticatedError();
  }
};
