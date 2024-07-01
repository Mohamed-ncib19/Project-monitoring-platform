require("dotenv").config();
const verifyJWT = require("../../../middlewares/verifyJWT");
const portfolioController = require("../controllers/portfolio.controller");
const checkUserActive = require("../../../middlewares/checkUserActive ");

async function routes(fastify, options) {
  //Create porfolio
  fastify.get("/dashboard/member/", {
    preHandler: [verifyJWT, checkUserActive],
    handler: memberDashboardController.getData,
  });
}

module.exports = routes;
