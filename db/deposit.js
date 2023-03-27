const { connectToDB } = require("./connect");

const deposit = async (passport_id, cash) => {
  try {
    const result = await connectToDB()
      .then(async (result) => {
        [db, client] = result;
        const usersCollection = db.collection("users");
        const user = await usersCollection
          .find({ passport_id: passport_id })
          .toArray();
        const oldAmount = user[0].cash;
        const newAmount = oldAmount + cash;

        console.log("new cash", newAmount);
        const filter = { passport_id: passport_id };
        const options = { upsert: false };
        const updateCashInDoc = {
          $set: {
            cash: newAmount,
          },
        };
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

module.exports = deposit;
