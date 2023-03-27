const asyncHandler = require("express-async-handler");
const checkUserExists = require("../../db/checkUserExists");

const isUser = asyncHandler(async (req, res, next) => {
  //   const { passport_id } = req.body;
  const passport_id = req.params.id;
  if (!passport_id) {
    res.status(400);
    throw new Error("got empty fields");
  }
  await checkUserExists(passport_id).then((result) => {
    if (!result) {
      res.status(405);
      throw new Error("user does not exist");
    }
    // console.log("result in isUser", result);
    if (result.passport_id) {
      return next();
    } else {
      res.status(500);
      throw new Error("sth went wrong");
    }
  });
});

// const isActive = asyncHandler(async (req, res, next) => {
//   await checkActive(passport_id).then((result) => {
//     console.log("result in isActive middleware", result);
//     if (result) {
//       return next();
//     } else {
//       if (result === "undefined") {
//         res.status(400);
//         throw new Error("sth went wrong try again");
//       } else if (result === false) {
//         res.status(401);
//         throw new Error("user not active");
//       }
//     }
//   });
// });

module.exports = isUser;
