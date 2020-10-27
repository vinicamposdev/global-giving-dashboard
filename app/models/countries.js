const axios = require("axios");
const { Pool } = require("pg");

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
    countries.forEach(({ alpha2Code, name }) => {
      const treatedName = name.includes("'") ? name.replace("'", "*") : name; // Error on node when trying to insert country 'Côte d'Ivoire'
      values += `('${treatedName}', '${alpha2Code}' ),`;
    });
    values = values.substring(0, values.length - 1) + ";";

    const query = `
      INSERT INTO countries (name, code)
      VALUES ${values}
    `;

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
