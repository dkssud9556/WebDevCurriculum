class InternalServerError extends Error {
  constructor() {
    super('Internal server error');
    this.message = 'Internal server error';
    this.statusCode = 500;
  }
}
// # sourceMappingURL=internalServerError.js.map
