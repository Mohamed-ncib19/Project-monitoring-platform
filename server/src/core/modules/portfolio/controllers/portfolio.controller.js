require("dotenv").config();
const httpStatus = require("http-status");
const portfolioServices = require("../services/portfolio.services");

const portfolioController = {
  async createPortfolio(req, res) {
    try {
      const { body, user } = req;

      if (!body || !body.name) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio data or name" });
      }

      const { exists } = await portfolioServices.portfolioExists(body.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "Portfolio name already taken" });
      }

      const createResponse = await portfolioServices.createPortfolio(
        body,
        user.id
      );
      if (createResponse.ok) {
        return res
          .status(httpStatus.CREATED)
          .send({ message: "Portfolio created successfully" });
      } else {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          message: "Failed to create portfolio",
          details: createResponse.message,
        });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: `${error.message} : ${error.details}`,
      });
    }
  },

  async getCurrentUserPortfolios(req, res) {
    try {
      const { user } = req;
      if (!user || !user.id) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing manager id" });
      }

      const portfoliosRes = await portfolioServices.getPortfolios(user.id);
      if (portfoliosRes.ok) {
        return res
          .status(httpStatus.OK)
          .send({ portfolios: portfoliosRes.portfolios });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No portfolios found for this manager" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async getPortfolios(req, res) {
    try {
      const portfoliosRes = await portfolioServices.getPortfolios();
      if (portfoliosRes.ok) {
        return res
          .status(httpStatus.OK)
          .send({ portfolios: portfoliosRes.portfolios });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No portfolios found" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async getPortfolioById(req, res) {
    try {
      const { portfolioId } = req.params;
      if (!portfolioId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }

      const portfolioResponse = await portfolioServices.getPortfolioById(
        portfolioId
      );
      if (portfolioResponse.ok && portfolioResponse.portfolio) {
        return res
          .status(httpStatus.OK)
          .send({ portfolio: portfolioResponse.portfolio });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Portfolio not found" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async deletePortfolio(req, res) {
    try {
      const { portfolioId } = req.params;
      if (!portfolioId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }

      const deleteResponse = await portfolioServices.deletePortfolio(
        portfolioId
      );
      if (deleteResponse.ok) {
        return res
          .status(httpStatus.OK)
          .send({ message: "Portfolio deleted successfully" });
      } else {
        console.log(deleteResponse);
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to delete portfolio" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async editPortfolio(req, res) {
    try {
      const { portfolioId } = req.params;
      const { body } = req;

      if (!body) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio data" });
      }
      if (!portfolioId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }
      const { exists } = await portfolioServices.portfolioExists(body?.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "Portfolio name already taken" });
      }
      const editResponse = await portfolioServices.editPortfolio(
        portfolioId,
        body
      );
      if (editResponse.ok) {
        return res
          .status(httpStatus.OK)
          .send({ message: "Portfolio edited successfully" });
      } else {
        console.log(editResponse);
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to edit portfolio" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};

module.exports = portfolioController;
