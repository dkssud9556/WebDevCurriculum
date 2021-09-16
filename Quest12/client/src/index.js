const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const { PRIVATE_KEY_PATH, CERTIFICATE_PATH } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.resolve() + "/src"));
app.use("/login", (req, res, next) => {
  res.sendFile(path.resolve() + "/src/login.html");
});
app.use("/", (req, res, next) => {
  res.sendFile(path.resolve() + "/src/index.html");
});

const key = fs.readFileSync(PRIVATE_KEY_PATH);
const cert = fs.readFileSync(CERTIFICATE_PATH);
const server = https.createServer({ key, cert }, app);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
