const express = require("express");
const path = require("path");

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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
