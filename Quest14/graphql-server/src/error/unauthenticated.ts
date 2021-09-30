import BusinessError from '@error/businessError';

export default class UnauthenticatedError extends BusinessError {
  constructor() {
    super('Unauthenticated', 403, 'Unauthenticated user');
  }
}
