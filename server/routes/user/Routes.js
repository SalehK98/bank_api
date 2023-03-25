const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userController");

router.route("/").get(userControllers.getUsers).post(userControllers.addUser);

router
  .route("/:id")
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
