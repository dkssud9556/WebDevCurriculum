import BusinessError from "./businessError.js";

export default class InvalidLoginInfoError extends BusinessError {
  constructor() {
    super(403, "Invalid login info");
  }
}
