import BusinessError from '@error/businessError';

export default class FileNotFoundError extends BusinessError {
  constructor() {
    super('FileNotFound', 404, 'File not found');
  }
}
