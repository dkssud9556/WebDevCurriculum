export default class BusinessError extends Error {
  public readonly typename: string;

  public readonly statusCode: number;

  public readonly message: string;

  constructor(typename: string, statusCode: number, message: string) {
    super(message);
    this.typename = typename;
    this.statusCode = statusCode;
    this.message = message;
  }
}
