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

  has(request) {
    return this.#handlers.has(request);
  }

  handle(request, {req, res}) {
    if (this.#handlers.has(request)) {
      return this.#handlers.get(request)(req, res);
    }
    res.statusCode = 404;
    res.end();
  }
}