import RequestHandler from "../requestHandler.mjs";
import PicService from "./picService.mjs";

export default class PicRequestHandler extends RequestHandler {
  #picService;

  constructor() {
    super();
    this.#picService = new PicService();
    this.#init();
  }

  #init() {
    this
      .post('/pic/upload', async (req, res) => {
        if (!req.body) {
          res.statusCode = 400;
        } else {
          try {
            await this.#picService.uploadPicture(req.body);
          } catch (e) {
            res.statusCode = 500;
          }
        }
        res.end();
      })
      .get('/pic/show', async (req, res) => {
        try {
          const picture = await this.#picService.getPicture();
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.write(picture);
        } catch (e) {
          res.statusCode = 500;
        }
        res.end();
      })
      .get('/pic/download', async (req, res) => {
        try {
          const picture = await this.#picService.getPicture();
          res.writeHead(200, {'Content-Disposition': 'attachment;filename=pic.jpg'});
          res.write(picture);
        } catch (e) {
          res.statusCode = 500;
        }
        res.end();
      });
  }
}