const { connectToDB } = require("./connect");

const checkUserExists = async (passport_id) => {
  try {
    const result = await connectToDB()
      .then(async (result) => {
        [db, client] = result;
        const usersCollection = db.collection("users");

        const user = await usersCollection
          .find({ passport_id: parseInt(passport_id) })
          .toArray();
        await client.close();
        console.log("client closed");
        return user[0];
      })
      .catch((err) => {
        console.error("user exits error error", err);
        return err;
      });
    return result;
  } catch (error) {
    console.error("check user exits error try error", error);
    return error;
  }
};

module.exports = checkUserExists;
