import BusinessError from "./businessError.js";

export default class FileNotFoundError extends BusinessError {
  constructor() {
    super("FileNotFound", 404, "File not found");
  }
}
