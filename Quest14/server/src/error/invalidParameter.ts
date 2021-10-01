import BusinessError from '@error/businessError';

export default class InvalidParameterError extends BusinessError {
  constructor() {
    super('InvalidParameter', 400, 'Invalid parameter');
  }
}
