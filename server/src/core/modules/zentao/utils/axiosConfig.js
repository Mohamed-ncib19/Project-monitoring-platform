// utils/axiosConfig.js
const axios = require("axios");
require("dotenv").config();

const createAxiosConfig = (urlPath, method, data) => {
  return {
    method: `${method}`,
    maxBodyLength: Infinity,
    url: `${process.env.ZENTAO_API_URL}${urlPath}`,
    headers: {
      "Authorization": `Bearer ${process.env.ZENTAO_TOKEN}`,
      "Cookie": `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
};

const makeRequest = async (config) => {
  try {
    const res = await axios.request(config);
    if (res.status === 201) {
      return { ok: false, data: res };
    } else {
      throw new Error(
        `\nRequest failed with status code: ${res.status} details: ${res}\n`
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { createAxiosConfig, makeRequest };
