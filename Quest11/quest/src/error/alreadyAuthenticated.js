import BusinessError from "./businessError.js";

export default class AlreadyAuthenticatedError extends BusinessError {
  constructor() {
    super(409, "Already authenticated");
  }
}
