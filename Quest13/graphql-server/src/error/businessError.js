export default class BusinessError extends Error {
  constructor(__typename, statusCode, message) {
    super(message);
    this.__typename = __typename;
    this.statusCode = statusCode;
    this.message = message;
  }
}
