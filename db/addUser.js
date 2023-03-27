const { connectToDB } = require("./connect");

const addUserToDB = async (
  passport_id,
  name,
  password = "",
  role = "user",
  active = true,
  cash = 0.0,
  credit = 0.0
) => {
  try {
    const result = await connectToDB()
      .then(async (result) => {
        [db, client] = result;
        const usersCollection = db.collection("users");
        await usersCollection.createIndex({ passport_id: 1 }, { unique: true });
        try {
          const inserted = await usersCollection.insertOne({
            passport_id: passport_id,
            cash: cash,
            credit: credit,
            name: name,
            password: password,
            active: active,
            role: role,
          });

          return inserted;
        } catch (error) {
          return error;
        } finally {
          await client.close();
          console.log("client closed");
        }
      })
      .catch((err) => {
        console.error("add error", err);
      });
    return result;
  } catch (error) {
    console.error("add try error", error);
    return error;
  }
};

module.exports = addUserToDB;
