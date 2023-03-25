const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const server = express();
const port = process.env.PORT || 5959;

server.use("/bank_api/users", require("./routes/user/Routes"));

server.listen(port, () => {
  console.log(`Server Listening on: http://localhost:${port}`);
});
