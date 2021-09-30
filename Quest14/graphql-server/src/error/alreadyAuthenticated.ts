import BusinessError from '@error/businessError';

export default class AlreadyAuthenticatedError extends BusinessError {
  constructor() {
    super('AlreadyAuthenticated', 409, 'Already authenticated');
  }
}
