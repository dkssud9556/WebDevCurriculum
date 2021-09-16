import BusinessError from "./businessError.js";

export default class UsernameDuplicationError extends BusinessError {
  constructor() {
    super(409, "Username is duplicated");
  }
}
