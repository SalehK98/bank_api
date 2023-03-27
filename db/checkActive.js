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
        try {
          const updated = await usersCollection.updateOne(
            filter,
            updateCashInDoc,
            options
          );
          console.log(
            `${updated.matchedCount} document(s) matched the filter, updated ${updated.modifiedCount} document(s)`
          );
          return `${updated.matchedCount} document(s) matched the filter, updated ${updated.modifiedCount} document(s)`;
        } catch (error) {
          console.log("error in deposit in db", error);
          return error;
        } finally {
          await client.close();
          console.log("client closed");
        }
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
