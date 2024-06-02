const PortfolioModel = require("../models/portfolio");
const zentaoServices = require("../../zentao/services/zentao.services");
const userServices = require("../../users/services/user.services");

const { v4: uuidv4 } = require("uuid");

const portfolioServices = {
  async portfolioExists(name) {
    try {
      const portfolioModel = await PortfolioModel();
      const portfolio = await portfolioModel.findOne({ name: name });
      if (portfolio) {
        return { ok: true, exists: true, portfolio: portfolio };
      }
      return { ok: true, exists: false, message: "portfolio does not exist" };
    } catch (error) {
      console.error("Error checking if project exists:", error);
      return { ok: false, message: "Error checking if portfolio exists" };
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
      const porfolioResult = await portfolioCollection.insertOne({
        ...portfolio,
        zentaoId: zentaoResponse.data.id,
        _id: portfolioId,
        createdAt: new Date(),
        active: true,
        managerUsername: manager,
      });
      if (porfolioResult.acknowledged) {
        const userResult = await userServices.managePorfolio(
          manager,
          portfolioId
        );
        if (!userResult.ok) {
          console.log("tneket omha");
        }
        return { ok: true, message: "Portfolio created successfully" };
      } else {
        return { ok: false, message: "MongoDB error" };
      }
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
  async getPortfolios(manager) {
    try {
      console.log(manager);
      const portfolioModel = await PortfolioModel();
      const portfolios = await portfolioModel
        .find({ managerUsername: manager })
        .toArray();
      if (portfolios != null) {
        return { ok: true, portfolios: portfolios };
      }
      return { ok: false, message: "portfolios does not exist" };
    } catch (error) {
      console.error("Error getting portfolios:", error);
      return { ok: false, message: "Error getting portfolios" };
    }
  },
};

module.exports = portfolioServices;
