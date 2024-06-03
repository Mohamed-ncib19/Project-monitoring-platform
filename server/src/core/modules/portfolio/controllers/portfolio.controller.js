require("dotenv").config();
const httpStatus = require("http-status");
const portfolioServices = require("../services/portfolio.services");

const portfolioController = {
  async createPortfolio(request, reply) {
    try {
      const manager = request.user.username;
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
        return reply
          .status(httpStatus.CONFLICT)
          .send({ message: "Portfolio name already taken" });
      }

      const createResponse = await portfolioServices.createPortfolio(
        portfolioData,
        manager
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
      const manager = request.user.username;
      if (!manager) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing manager username" });
      }

      const portfoliosRes = await portfolioServices.getPortfolios(manager);

      if (portfoliosRes.ok && portfoliosRes.portfolios.length > 0) {
        return reply
          .status(httpStatus.OK)
          .send({ portfolios: portfoliosRes.portfolios });
      } else {
        return reply
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No portfolios found for this manager" });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  async getPortfolioById(request, reply) {
    try {
      const { portfolioId } = request.params;

      if (!portfolioId) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }

      const portfolioResponse = await portfolioServices.getPortfolioById(
        portfolioId
      );

      if (!portfolioResponse.ok || !portfolioResponse.portfolio) {
        return reply
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Portfolio not found" });
      }

      return reply
        .status(httpStatus.OK)
        .send({ portfolio: portfolioResponse.portfolio });
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  async deletePortfolio(request, reply) {
    try {
      const { portfolioId } = request.params;
      if (!portfolioId) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }
      const deleteResponse = await portfolioServices.deletePortfolio(
        portfolioId
      );

      if (deleteResponse.ok) {
        return reply
          .status(httpStatus.OK)
          .send({ message: "Portfolio deleted successfully" });
      } else {
        return reply
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to delete portfolio" });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  async editPortfolio(request, reply) {
    try {
      const { portfolioId } = request.params;
      const portfolioData = request.body;

      if (!portfolioId) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }

      if (!portfolioData) {
        return reply
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio data" });
      }

      const editResponse = await portfolioServices.editPortfolio(
        portfolioId,
        portfolioData
      );

      if (editResponse.ok) {
        return reply
          .status(httpStatus.OK)
          .send({ message: "Portfolio edited successfully" });
      } else {
        return reply
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to edit portfolio" });
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