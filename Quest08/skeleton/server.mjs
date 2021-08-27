import http from 'http';
import RequestHandlerManager from "./requestHandler/requestHandlerManager.mjs";
import FooRequestHandler from "./requestHandler/foo/fooRequestHandler.mjs";
import PicRequestHandler from "./requestHandler/pic/picRequestHandler.mjs";

const requestHandlerManager = new RequestHandlerManager(
  new FooRequestHandler(), new PicRequestHandler()
);

const onRequest = async (req, res) => {
  await requestHandlerManager.handle(req, res);
}

const server = http.createServer(onRequest);

server.listen(8000);
