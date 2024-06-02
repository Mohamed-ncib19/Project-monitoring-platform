const PortfolioModel = require("../models/portfolio");
const zentaoServices = require("../../zentao/services/zentao.services");
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
  async createPortfolio(portfolio) {
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
      console.log(zentaoResponse);
      const portfolioId = uuidv4();
      const portfolioCollection = await PortfolioModel();
      const result = await portfolioCollection.insertOne({
        ...portfolio,
        zentaoId: zentaoResponse.data.id,
        _id: portfolioId,
        createdAt: new Date(),
        active: true,
      });

      if (result.acknowledged) {
        return { ok: true, message: "Portfolio created successfully" };
      } else {
        return { ok: false, message: "MongoDB error" };
      }
    } catch (error) {
      console.log(error)

      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = portfolioServices;
