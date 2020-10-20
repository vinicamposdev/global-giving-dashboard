const axios = require("axios");
const mongoose = require("mongoose");
const { token } = require("./config");

const getApiData = async () => {
  try {
    const response = axios({
      url: `https://api.globalgiving.org/api/public/projectservice/all/projects?api_key=${token}`,
      header: { Accept: "application/json" },
      method: "get",
    });

    console.log(response);

    return { statusCode: 200, body: response };
  } catch (e) {
    console.log(e);

    return { statusCode: 500, body: { message: e.message } };
  }
};

getApiData();
