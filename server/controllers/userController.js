//@desc Gel all users
//@route GET /bank_api/users
//@access public
const getUsers = (req, res) => {
  console.log("get request");
  res.end("get all users");
};

//@desc add a users
//@route POST /bank_api/users
//@access public
const addUser = (req, res) => {
  console.log("post request");
  res.end("added a user");
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
