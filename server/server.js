const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const server = express();
const port = process.env.PORT || 5959;

server.get("/", (req, res) => {
  console.log("got a request");
  res.end("hello world");
});

server.listen(port, () => {
  console.log(`Server Listening on: http://localhost:${port}`);
});
