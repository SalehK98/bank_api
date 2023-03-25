const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    console.log("get request");
    res.end("get all users");
  })
  .post((req, res) => {
    console.log("post request");
    res.end("added a user");
  });

router
  .route("/:id")
  .get((req, res) => {
    console.log("get request");
    res.end(`get a user ${req.params.id}`);
  })
  .put((req, res) => {
    console.log("put request");
    res.end(`update a user ${req.params.id}`);
  })
  .delete((req, res) => {
    console.log("delete request");
    res.end(`delete a user ${req.params.id}`);
  });

module.exports = router;
