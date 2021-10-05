import BusinessError from '@error/businessError';

export default class UsernameDuplicationError extends BusinessError {
  constructor() {
    super('UsernameDuplication', 409, 'Username is duplicated');
  }
}
