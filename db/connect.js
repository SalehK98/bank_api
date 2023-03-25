const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const envPath = path.join(__dirname, "../.env");
const dotenv = require("dotenv").config({ path: envPath });

// console.log(envPath);
// console.log(process.env._USERNAME);

const uri = `mongodb+srv://${process.env._USERNAME}:${process.env.PASSWORD}@bankapicluster.wbu8nfr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("connected successfully to server");
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // do sth
    const allResults = await usersCollection.find({}).toArray();
    console.log("allResults", allResults);
  } catch (error) {
    console.error("errorMSG", error);
  }
};

connectToDB()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    client.close();
  });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// async function main() {
//     try {
//         // Use connect method to connect to the server
//         await client.connect();
//         console.log('Connected successfully to server');
//         const db = client.db('test');
//         const collection = db.collection('documents');
// ​
//         // the following code examples can be pasted here...
//         // await collection.insertOne({ name: "yishai" });
//         // const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
//         const findResult = await collection.find({}).toArray();
//         const findSingleResult = await collection.find({ name: "yishai" }).toArray();
//         console.log('findSingleResult', findSingleResult);
//         console.log('Found documents =>', findResult);
//     } catch (error) {
//         console.log('error', error);
//     }
// }
// ​
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
