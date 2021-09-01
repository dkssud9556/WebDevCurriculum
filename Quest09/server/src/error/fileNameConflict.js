import BusinessError from "./businessError.js";

export default class FileNameConflictError extends BusinessError {
  constructor() {
    super(409, "File name conflict");
  }
}
