const { Collection } = require("mongodb");
const { connectToDB } = require("../../db/connect");

//@desc Gel all users
//@route GET /bank_api/users
//@access public
const getUsers = (req, res) => {
  console.log("get request");
  connectToDB()
    .then(async (result) => {
      const [Collection, client] = result;
      const users = await Collection.find({}).toArray();
      console.log(users);
      await res.status(200).end(JSON.stringify(users));
      client.close();
      console.log("client closed");
    })
    .catch((err) => {
      console.error("getError", err);
    });
  // .finally(() => {
  //   client.close();
  // });
};

//@desc add a users
//@route POST /bank_api/users
//@access public
const addUser = (req, res) => {
  console.log("post request");
  connectToDB()
    .then(async (result) => {
      const [collection, client] = result;
      const inserted = await collection.insertOne({ name: "salehkalouti" });
      console.log("inserted", inserted);
      res.status(201).end("added a user");
      await client.close();
      console.log("client closed");
    })
    .catch((err) => {
      console.error("postError", err);
    });
};

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
