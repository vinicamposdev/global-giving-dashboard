const axios = require("axios");
const { Pool } = require("pg");
const MongoClient = require("mongodb").MongoClient;
const { mongoUri } = require("../config");

const uri = mongoUri;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

const charge = async () => {
  try {
    const response = await axios({
      url: `https://restcountries.eu/rest/v2/all`,
      method: "get",
    });

    const countries = response.data;

    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "docker",
      port: 5433,
    });

    let values = "";
    const mongoCollectionDocument = [];
    countries.forEach(({ alpha2Code, name }) => {
      const treatedName = name.includes("'") ? name.replace("'", "*") : name; // Error on node when trying to insert country 'Côte d'Ivoire'
      values += `('${treatedName}', '${alpha2Code}' ),`;
      mongoCollectionDocument.push({ name: treatedName, code: alpha2Code });
    });
    values = values.substring(0, values.length - 1) + ";";

    const query = `
      INSERT INTO countries (name, code)
      VALUES ${values}
    `;

    mongoClient.connect(async (err) => {
      const collection = mongoClient
        .db("global-giving")
        .collection("countries");
      const insertDocument = await collection.insertMany(
        mongoCollectionDocument
      ); //.countDocuments()
      console.log(insertDocument, err);
      mongoClient.close();
    });

    console.log({ query });

    pool.query(query, (err, res) => {
      console.log(err, res);
      pool.end();
    });

    return "success";
  } catch (e) {
    console.log(e);
    return null;
  }
};

charge();

exports.default = charge;
