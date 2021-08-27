import http from 'http';
import {existsSync, mkdirSync} from 'fs';

import RequestHandlerManager from "./requestHandler/requestHandlerManager.mjs";
import FooRequestHandler from "./requestHandler/foo/fooRequestHandler.mjs";
import PicRequestHandler from "./requestHandler/pic/picRequestHandler.mjs";
import {PICTURE_FOLDER_PATH} from "./constants.mjs";

const makePicFolder = () => {
  if (!existsSync(PICTURE_FOLDER_PATH)) {
    mkdirSync(PICTURE_FOLDER_PATH);
  }
};

makePicFolder();

const requestHandlerManager = new RequestHandlerManager(
  new FooRequestHandler(), new PicRequestHandler()
);

const server = http.createServer((req, res) => {
  return requestHandlerManager.handle(req, res);
});

server.listen(8000);
