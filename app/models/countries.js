const axios = require("axios");
const { Pool } = require("pg");

let nextOrgId = 1;

const charge = async () => {
  try {
    const response = await axios({
      url: `https://restcountries.eu/rest/v2/all`,
      method: "get",
    });

    const countries = response.data;
    console.log(countries);

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
    console.log({
      values,
      value_last: (values[values.length - 1] = ";"),
      value_sub: values.slice(0, values[values.length - 2]),
    });

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
