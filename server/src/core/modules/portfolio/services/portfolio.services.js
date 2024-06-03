const PortfolioModel = require("../models/portfolio");
const zentaoServices = require("../../zentao/services/zentao.services");
const userServices = require("../../users/services/user.services");

const { v4: uuidv4 } = require("uuid");
const portfolioServices = {
  async portfolioExists(name) {
    try {
      const portfolioModel = await PortfolioModel();
      const portfolio = await portfolioModel.findOne({ name });

      if (portfolio) {
        return { ok: true, exists: true, portfolio };
      }

      return { ok: true, exists: false, message: "Portfolio does not exist" };
    } catch (error) {
      console.error("Error checking if portfolio exists:", error);
      return {
        ok: false,
        message: "Error checking if portfolio exists",
        details: error.message,
      };
    }
  },

  async createPortfolio(portfolio, manager) {
    try {
      const zentaoResponse = await zentaoServices.createPortfolio(
        portfolio.name
      );

      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      const portfolioId = uuidv4();
      const portfolioCollection = await PortfolioModel();

      const portfolioResult = await portfolioCollection.insertOne({
        ...portfolio,
        zentaoId: zentaoResponse.data.id,
        _id: portfolioId,
        createdAt: new Date(),
        active: true,
        managerUsername: manager,
      });

      if (portfolioResult.acknowledged) {
        const userResult = await userServices.managePorfolio(
          manager,
          portfolioId
        );

        if (!userResult.ok) {
          console.error(
            "Error managing portfolio for user:",
            userResult.message
          );
          return { ok: false, message: "Error managing portfolio for user" };
        }

        return { ok: true, message: "Portfolio created successfully" };
      } else {
        return { ok: false, message: "MongoDB error" };
      }
    } catch (error) {
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },

  async getPortfolios(manager) {
    try {
      const portfolioModel = await PortfolioModel();
      const portfolios = await portfolioModel
        .find({ managerUsername: manager })
        .toArray();

      if (portfolios && portfolios.length > 0) {
        return { ok: true, portfolios };
      }

      return { ok: false, message: "No portfolios found for this manager" };
    } catch (error) {
      console.error("Error getting portfolios:", error);
      return {
        ok: false,
        message: "Error getting portfolios",
        details: error.message,
      };
    }
  },

  async getPortfolioById(portfolioId) {
    try {
      const portfolioModel = await PortfolioModel();
      const portfolio = await portfolioModel.findOne({ _id: portfolioId });

      if (portfolio) {
        return { ok: true, portfolio };
      }

      return { ok: false, message: "Portfolio not found" };
    } catch (error) {
      console.error("Error getting portfolio by ID:", error);
      return {
        ok: false,
        message: "Error getting portfolio",
        details: error.message,
      };
    }
  },

  async deletePortfolio(portfolioId) {
    try {
      const portfolioCollection = await PortfolioModel();
      // Find the portfolio to delete it from Zentao as well
      const portfolio = await portfolioCollection.findOne({ _id: portfolioId });
      if (!portfolio) {
        return { ok: false, message: "Portfolio not found" };
      }

      // Delete the portfolio from Zentao
      const zentaoResponse = await zentaoServices.deletePortfolio(
        portfolio.zentaoId
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      // Delete the portfolio from the database
      const deleteResult = await portfolioCollection.updateOne(
        { _id: portfolioId },
        { $set: { active: false } }
      );
      if (deleteResult.modifiedCount === 1) {
        return { ok: true, message: "Portfolio deleted successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to delete portfolio",
        };
      }
    } catch (error) {
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
  async editPortfolio(portfolioId, portfolioData) {
    try {
      const portfolioCollection = await PortfolioModel();
      // Find the portfolio to edit it
      const portfolio = await portfolioCollection.findOne({ _id: portfolioId });
      if (!portfolio) {
        return { ok: false, message: "Portfolio not found" };
      }

      // Update the portfolio in Zentao if needed
      const zentaoResponse = await zentaoServices.editPortfolio(
        portfolio.zentaoId,
        portfolioData
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      // Update the portfolio in the database
      const updateResult = await portfolioCollection.updateOne(
        { _id: portfolioId },
        { $set: portfolioData }
      );
      if (updateResult.modifiedCount === 1) {
        return { ok: true, message: "Portfolio edited successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to edit portfolio",
        };
      }
    } catch (error) {
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = portfolioServices;
