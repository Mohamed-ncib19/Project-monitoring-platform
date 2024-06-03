require("dotenv").config();
const formatDate = require("../utils/functions");
const axios = require("axios");
const zentaoServices = {
  async createPortfolio(name) {
    try {
      let data = {
        name,
        begin: formatDate(new Date()),
        end: "2050-01-01",
      };
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/programs`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
        data: data,
      };
      const response = await axios.request(config);
      if (response.status === 201) {
        return { ok: true, data: response.data };
      } else {
        console.log(response);
        return { ok: false };
      }
    } catch (error) {
      console.log(error);
      return { ok: false, message: "Error: ", error };
    }
  },
  async deletePortfolio(portfolioId) {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/programs/${portfolioId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
      };
      const response = await axios.request(config);
      if (response.status === 200 || response.status === 204) {
        return { ok: true, data: response.data };
      } else {
        console.log(response);
        return { ok: false };
      }
    } catch (error) {
      console.log(error.response);
      return { ok: false, message: "Error: ", error };
    }
  },
  async editPortfolio(portfolioId, portfolioData) {
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/programs/${portfolioId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
        data: portfolioData,
      };
      const response = await axios.request(config);
      if (response.status === 200 || response.status === 204) {
        return { ok: true, data: response.data };
      } else {
        console.log(response);
        return { ok: false };
      }
    } catch (error) {
      console.log(error.response);
      return { ok: false, message: "Error: ", error };
    }
  },
};

module.exports = zentaoServices;
