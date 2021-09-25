import BusinessError from "./businessError.js";

export default class InvalidLoginInfoError extends BusinessError {
  constructor() {
    super("InvalidLoginInfo", 403, "Invalid login info");
  }
}
