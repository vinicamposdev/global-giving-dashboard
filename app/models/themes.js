const axios = require("axios");
const { Pool } = require("pg");
const { token } = require("../config");

const charge = axios({
  url: `https://api.globalgiving.org/api/public/projectservice/themes?api_key=${token}`,
  header: { Accept: "application/json" },
  method: "get",
}).then((response) => {
  const themes = response.data.themes.theme;
  console.log(themes);

  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "docker",
    port: 5432,
  });

  let values = "";
  themes.forEach(({ id, name }) => {
    values += `('${id}', '${name}'),`;
  });
  values = values.substring(0, values.length - 1) + ";";
  console.log({
    values,
    value_last: (values[values.length - 1] = ";"),
    value_sub: values.slice(0, values[values.length - 2]),
  });

  const query = `
      INSERT INTO themes (original_id, name)
      VALUES ${values}
    `;

  console.log({ query });

  pool.query(query, (err, res) => {
    console.log(err, res);
    pool.end();
  });
});

exports.default = charge;
