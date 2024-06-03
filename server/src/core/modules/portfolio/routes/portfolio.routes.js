require("dotenv").config();
const verifyJWT = require("../../../middlewares/verifyJWT");
const portfolioController = require("../controllers/portfolio.controller");
const checkUserActive = require("../../../middlewares/checkUserActive ");

async function routes(fastify, options) {
  //Create porfolio
  fastify.post("/portfolios", {
    preHandler: [verifyJWT, checkUserActive],
    handler: portfolioController.createPortfolio,
  });
  //get porfolios
  fastify.get("/portfolios", {
    preHandler: [verifyJWT, checkUserActive],
    handler: portfolioController.getPortfolios,
  });
  fastify.delete("/portfolios/:portfolioId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: portfolioController.deletePortfolio,
  });
  fastify.get("/portfolios/:portfolioId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: portfolioController.getPortfolioById,
  });
  fastify.put("/portfolios/:portfolioId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: portfolioController.editPortfolio,
  });
}

module.exports = routes;
