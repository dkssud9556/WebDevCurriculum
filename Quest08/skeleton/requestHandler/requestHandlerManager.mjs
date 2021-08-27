export default class RequestHandlerManager {
  #requestHandlers;

  constructor(...requestHandlers) {
    this.#requestHandlers = requestHandlers;
  }

  async handle(req, res) {
    await this.#parseRequestData(req);
    const requestHandler = this.#requestHandlers.find(
      requestHandler => requestHandler.has(req.method, req.pathname)
    );
    if (!requestHandler) {
      res.statusCode = 404;
      return res.end();
    }
    await requestHandler.handle(req.method, req.pathname, {req, res});
  }

  #parseRequestData = async (req) => {
    const parsedUrl = this.#parseUrl(req);
    req.query = this.#convertIntoObj(parsedUrl.searchParams);
    req.body = await this.#parseBody(req);
    req.pathname = parsedUrl.pathname;
  }

  #parseUrl = (req) => {
    const baseUrl = `${req.protocol}://${req.hostname}/`;
    return new URL(req.url, baseUrl);
  }

  #parseBody = async (req) => {
    const data = [];
    for await (const chunk of req) {
      data.push(chunk);
    }
    return req.headers['content-type'] === 'application/json'
      ? JSON.parse(data)
      : req.headers['content-type'] === 'image/jpeg'
        ? Buffer.concat(data)
        : null;
  }

  #convertIntoObj = (map) => {
    const result = {};
    for (const [key, value] of map) {
      result[key] = value;
    }
    return result;
  }
}