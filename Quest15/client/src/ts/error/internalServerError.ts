export default class InternalServerError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor() {
    super('Internal server error');
    this.message = 'Internal server error';
    this.statusCode = 500;
  }
}
