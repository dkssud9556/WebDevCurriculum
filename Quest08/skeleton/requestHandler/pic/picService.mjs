import fs from 'fs/promises';
import {PICTURE_FILE_PATH} from "../../constants.mjs";

export default class PicService {
  uploadPicture(picture) {
    return fs.writeFile(PICTURE_FILE_PATH, picture);
  }

  getPicture() {
    return fs.readFile(PICTURE_FILE_PATH);
  }
}