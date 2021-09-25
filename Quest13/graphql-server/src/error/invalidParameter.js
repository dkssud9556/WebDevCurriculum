import BusinessError from "./businessError.js";

export default class InvalidParameterError extends BusinessError {
  constructor() {
    super("InvalidParameter", 400, "Invalid parameter");
  }
}
