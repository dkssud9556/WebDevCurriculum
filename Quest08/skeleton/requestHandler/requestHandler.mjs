export default class RequestHandler {
  #handlers;

  constructor() {
    this.#handlers = new Map();
  }

  register(method, url, callback) {
    this.#handlers.set(`${method} ${url}`, callback);
    return this;
  }

  get(url, callback) {
    return this.register('GET', url, callback);
  }

  post(url, callback) {
    return this.register('POST', url, callback);
  }

  has(method, url) {
    return this.#handlers.has(`${method} ${url}`);
  }

  handle(method, url, {req, res}) {
    this.#handlers.get(`${method} ${url}`)(req, res);
  }
}