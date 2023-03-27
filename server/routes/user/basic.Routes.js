const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userController");
const isUser = require("../../middleware/isUser");

router.route("/").get(userControllers.getUsers).post(userControllers.addUser);

router
  .get("/:id", isUser, userControllers.getUser)
  .delete("/:id", isUser, userControllers.deleteUser);

module.exports = router;
