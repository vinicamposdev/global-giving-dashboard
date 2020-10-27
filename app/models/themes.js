const axios = require("axios");
const { Pool } = require("pg");
const { token } = require("../config");

const charge = axios({
  url: `https://api.globalgiving.org/api/public/projectservice/themes?api_key=${token}`,
  header: { Accept: "application/json" },
  method: "get",
}).then((response) => {
  const themes = response.data.themes.theme;

  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "docker",
    port: 5433,
  });

  let values = "";
  themes.forEach(({ id, name }) => {
    values += `('${id}', '${name}'),`;
  });
  values = values.substring(0, values.length - 1) + ";";

  const query = `
      INSERT INTO themes (id, name)
      VALUES ${values}
    `;

  pool.query(query, (_err, _res) => {
    console.log(_err, _res);
    pool.end();
  });
});

exports.default = charge;