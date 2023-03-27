const checkActive = require("../../db/checkActive");
const asyncHandler = require("express-async-handler");

const isActive = asyncHandler(async (req, res, next) => {
  const { passport_id } = req.body;
  if (!passport_id) {
    res.status(400);
    throw new Error("got empty fields");
  }
  await checkActive(passport_id).then((result) => {
    console.log("result in isActive middleware", result);
    if (result) {
      return next();
    } else {
      if (result === "undefined") {
        res.status(500);
        throw new Error("sth went wrong try again");
      } else if (result === false) {
        res.status(401);
        throw new Error("user not active");
      }
    }
  });
});

module.exports = isActive;
