import fs from 'fs/promises';
import path from 'path';

export default class PicService {
  static PICTURE_PATH = path.resolve() + '/static/pic.jpg';

  uploadPicture(picture) {
    return fs.writeFile(PicService.PICTURE_PATH, picture);
  }

  getPicture() {
    return fs.readFile(PicService.PICTURE_PATH);
  }
}