import BusinessError from "./businessError.js";

export default class UnauthenticatedError extends BusinessError {
  constructor() {
    super("Unauthenticated", 403, "Unauthenticated user");
  }
}
