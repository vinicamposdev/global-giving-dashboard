const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://admin:admin@prometheus.z7xl3.mongodb.net/<dbname>?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });
mongoClient.connect(async (err) => {
  const collection = mongoClient.db("global-giving").collection("projects");
  const countTest = await collection.countDocuments(); //.insertMany([{ b: "b" }, { c: "c" }]);
  console.log(countTest, err);
  mongoClient.close();
});
