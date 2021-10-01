class BusinessError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
// # sourceMappingURL=businessError.js.map
