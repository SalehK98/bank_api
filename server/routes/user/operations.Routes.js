const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userController");

router.route("/deposit").put(userControllers.deposit);

module.exports = router;
