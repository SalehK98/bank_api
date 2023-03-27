const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler.js");

const envPath = path.join(__dirname, "../.env");
const dotenv = require("dotenv").config({ path: envPath });

const server = express();
const port = process.env.PORT || 5151;

server.use(express.json());
server.use("/bank_api/users", require("./routes/user/Routes.js"));
server.use(errorHandler);

server.listen(port, () => {
  console.log(`Server Listening on: http://localhost:${port}`);
});
