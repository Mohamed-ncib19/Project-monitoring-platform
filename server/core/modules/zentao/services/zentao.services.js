require("dotenv").config();
const formatDate = require("../utils/functions");
const axios = require("axios");
const zentaoServices = {
  //portfolio services
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
      if (response.status === 201 || response.status === 200) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response.data.error };
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
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response.data };
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
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response.data.error };
    }
  },
  //product services
  async createProduct(product, porfolioZentaoId) {
    try {
      let data = {
        name: product.name,
        desc: product.desc,
        program: porfolioZentaoId,
        acl: "open",
        code: product.code,
      };
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/products`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      if (response.status === 201 || response.status === 200) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response.data.error };
    }
  },
  async editProduct(productId, productData) {
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/products/${productId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
        data: productData,
      };
      const response = await axios.request(config);
      if (response.status === 200 || response.status === 204) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      return { ok: false, message: error.response.data.error };
    }
  },
  async deleteProduct(productId) {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/products/${productId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
      };
      const response = await axios.request(config);
      if (response.status === 200 || response.status === 204) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data.error);
      return { ok: false, message: error.response.data.error };
    }
  },
  //project services

  async createProject(project, productZentaoId) {
    try {
      let data = {
        name: project.name,
        desc: project.description,
        parent: productZentaoId,
        code: project.code,
        begin: project.startDate,
        end: project.endDate,
        model: project.model,
        products: [productZentaoId],
      };
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/projects`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
        data: data,
      };
      const response = await axios.request(config);
      if (response.status === 201 || response.status === 200) {
        console.log("zentao request ended...");
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response };
    }
  },
  async editProject(projectId, projectData) {
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/projects/${projectId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
        data: projectData,
      };
      const response = await axios.request(config);
      if (response.status === 200 || response.status === 204) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response.data.error };
    }
  },
  async deleteProject(projectId) {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/projects/${projectId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
      };
      const response = await axios.request(config);
      if (response.status === 200 || response.status === 204) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response.data };
    }
  },
  //webhooks services

  async getExecution(executionId) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/executions/${executionId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
      };
      const response = await axios.request(config);
      if (response.status === 201 || response.status === 200) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error.response.data);
      return { ok: false, message: error.response };
    }
  },
  async getTask(taskId) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.ZENTAO_API_URL}/tasks/${taskId}`,
        headers: {
          Authorization: process.env.ZENTAO_TOKEN,
          "Content-Type": "application/json",
          Cookie: `device=desktop; lang=en; theme=default; zentaosid=${process.env.ZENTAO_TOKEN}`,
        },
      };
      const response = await axios.request(config);
      if (response.status === 201 || response.status === 200) {
        return { ok: true, data: response.data };
      }
    } catch (error) {
      console.log(error);
      return { ok: false, message: error.response };
    }
  },
};

module.exports = zentaoServices;
