const { connectToDB } = require("./connect");

const checkActive = async (passport_id) => {
  try {
    const result = await connectToDB()
      .then(async (result) => {
        [db, client] = result;
        const usersCollection = db.collection("users");

        const user = await usersCollection
          .find({ passport_id: passport_id })
          .toArray();
        const activeStatus = user[0].active;
        console.log(activeStatus);
        await client.close();
        console.log("client closed");

        return activeStatus;
      })
      .catch((err) => {
        console.error("deposit error", err);
      });
    return result;
  } catch (error) {
    console.error("deposit try error", error);
    return error;
  }
};

module.exports = checkActive;
