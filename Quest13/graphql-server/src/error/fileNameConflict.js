import BusinessError from "./businessError.js";

export default class FileNameConflictError extends BusinessError {
  constructor() {
    super("FileNameConflict", 409, "File name conflict");
  }
}
