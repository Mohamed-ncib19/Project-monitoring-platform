require("dotenv").config();
const autheticate = require("../../../middlewares/autheticate");
const portfolioController = require("../controllers/portfolio.controller");

async function routes(fastify, options) {
  //Create porfolio
  fastify.post("/portfolios", {
    preHandler: autheticate,
    handler: portfolioController.createPortfolio,
  });
  //get porfolios
  fastify.get("/portfolios", {
    preHandler: autheticate,
    handler: portfolioController.getPortfolios,
  });
}

module.exports = routes;
