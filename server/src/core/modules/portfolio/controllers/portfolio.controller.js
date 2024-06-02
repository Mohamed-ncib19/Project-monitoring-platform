require("dotenv").config();

const httpStatus = require("http-status");
const portfolioServices = require("../services/portfolio.services");

const portfolioController = {
  async createPortfolio(request, reply) {
    try {
      const portfolioData = request.body;
      if (!portfolioData || !portfolioData.name) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio data or name" });
      }
      const { exists } = await portfolioServices.portfolioExists(
        portfolioData.name
      );
      if (exists) {
        return reply.status(httpStatus.CONFLICT).send({
          message: "Portfolio name already taken",
        });
      }
      const createResponse = await portfolioServices.createPortfolio(
        portfolioData
      );
      if (createResponse.ok) {
        return reply
          .status(httpStatus.CREATED)
          .send({ message: "Portfolio created successfully" });
      } else {
        return reply
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to create portfolio" });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  async getPortfolios(request, reply) {
    try {
      const { managerId } = request.params;
      if (!managerId) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing managerId" });
      }

      const portfolios = await portfolioServices.getPortfolios(managerId);

      if (portfolios && portfolios.length > 0) {
        return reply.status(httpStatus.OK).send({ portfolios });
      } else {
        return reply
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No portfolios found for this managerId" });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};

module.exports = portfolioController;
