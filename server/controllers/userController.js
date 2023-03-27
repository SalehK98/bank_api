const { connectToDB } = require("../../db/connect");
const addUserToDB = require("../../db/addUser");
const asyncHandler = require("express-async-handler");

//@desc Gel all users
//@route GET /bank_api/users
//@access public
const getUsers = async (req, res) => {
  console.log("get request");
  connectToDB()
    .then(async (result) => {
      const [db, client] = result;
      const collection = db.collection("users");
      const users = await collection.find({}).toArray();
      console.log(users);
      await res.status(200).end(JSON.stringify(users));
      client.close();
      console.log("client closed");
    })
    .catch((err) => {
      console.error("getError", err);
    });
};

//@desc add a users
//@route POST /bank_api/users
//@access public
const addUser = asyncHandler(async (req, res) => {
  console.log("post request");
  //   console.log(req.body);
  const { passport_id, cash, credit, name, active, password, role } = req.body;
  if (!passport_id || !name) {
    res.status(400);
    throw new Error("got empty fields are empty");
  }
  await addUserToDB(passport_id, name).then((result) => {
    if (result.insertedId) {
      res.status(201).end("user added");
    } else {
      res.status(405);
      const stringedResult = result.toString();
      const errMsg = stringedResult.includes("duplicate key error")
        ? "passport_id already exists"
        : stringedResult;
      throw new Error(errMsg);
    }
  });
});

//@desc Gel a users
//@route GET /bank_api/users/:id
//@access public
const getUser = (req, res) => {
  console.log("get request");
  res.end(`get a user ${req.params.id}`);
};

//@desc Update users
//@route PUT /bank_api/users/:id
//@access public
const updateUser = (req, res) => {
  console.log("put request");
  res.end(`update a user ${req.params.id}`);
};

//@desc delete a users
//@route DELETE /bank_api/users/:id
//@access public
const deleteUser = (req, res) => {
  console.log("delete request");
  res.end(`delete a user ${req.params.id}`);
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
