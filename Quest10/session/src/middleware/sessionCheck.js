import UnauthenticatedError from "../error/unauthenticated.js";

export default (request, reply, done) => {
  if (!request.session || !request.session.username) {
    throw new UnauthenticatedError();
  }
  done();
};
