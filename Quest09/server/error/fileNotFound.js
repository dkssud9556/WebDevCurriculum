import BusinessError from "./businessError.js";

export default class FileNotFoundError extends BusinessError {
  constructor() {
    super(404, "File not found");
  }
}
