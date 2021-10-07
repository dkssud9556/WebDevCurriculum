export default class BusinessError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
