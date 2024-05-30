require("dotenv").config();
const porfolioController = require("../controllers/porfolioController");

async function routes(fastify, options) {
  //Create project
  fastify.post("/porfolios", porfolioController.createPorfolio);
}

module.exports = routes;
