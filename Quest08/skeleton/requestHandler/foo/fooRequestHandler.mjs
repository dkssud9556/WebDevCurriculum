import RequestHandler from "../requestHandler.mjs";
import FooService from "./fooService.mjs";

export default class FooRequestHandler extends RequestHandler {
  #fooService;

  constructor() {
    super();
    this.#fooService = new FooService();
    this.#init();
  }

  #init() {
    this
      .get('/', (req, res) => {
        res.end('Hello World!');
      })
      .get('/foo', (req, res) => {
        if (!req.query.bar) {
          res.statusCode = 400;
        } else {
          const result = this.#fooService.hello(req.query.bar);
          res.write(result);
        }
        res.end();
      })
      .post('/foo', (req, res) => {
        if (!req.body.bar) {
          res.statusCode = 400;
        } else {
          const result = this.#fooService.hello(req.body.bar);
          res.write(result);
        }
        res.end();
      });
  }
}