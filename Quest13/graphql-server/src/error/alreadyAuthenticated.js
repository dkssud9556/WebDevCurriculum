import BusinessError from "./businessError.js";

export default class AlreadyAuthenticatedError extends BusinessError {
  constructor() {
    super("AlreadyAuthenticated", 409, "Already authenticated");
  }
}
