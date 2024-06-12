const PortfolioModel = require("../models/portfolio");
const ProductModel = require("../../product/models/product");
const zentaoServices = require("../../zentao/services/zentao.services");
const userServices = require("../../users/services/user.services");
const productServices = require("../../product/services/product.services");

const { v4: uuidv4 } = require("uuid");
const portfolioServices = {
  async portfolioExists(name) {
    try {
      const portfolioModel = await PortfolioModel();
      const portfolio = await portfolioModel.findOne({ name });
      return { ok: true, exists: Boolean(portfolio), portfolio };
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
        console.log(zentaoResponse);
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.message,
        };
      }

      const portfolioId = uuidv4();
      const portfolioCollection = await PortfolioModel();
      const portfolioResult = await portfolioCollection.insertOne({
        _id: portfolioId,
        zentaoId: zentaoResponse.data.id,
        name: portfolio.name,
        createdAt: new Date(),
        manager,
        active: true,
      });

      return portfolioResult.acknowledged
        ? { ok: true, message: "Portfolio created successfully" }
        : {
            ok: false,
            message: "MongoDB error: Failed to create portfolio",
            details: portfolioResult,
          };
    } catch (error) {
      console.error("Error creating portfolio:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },

  async getPortfolios() {
    try {
      let portfolios = [];
      const portfoloCollection = await PortfolioModel();
      let result = await portfoloCollection.find({ active: true }).toArray();
      portfolios = await Promise.all(
        result.map(async (portfolio) => {
          const { products } = await productServices.getProducts(portfolio._id);
          portfolio.productCount = products.length;
          portfolio.projectCount = 0;
          for (const product of products) {
            portfolio.projectCount += product.projectCount;
          }
          return portfolio;
        })
      );

      return { ok: true, portfolios: portfolios };
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
      // Fetch the single portfolio by ID
      const portfolio = await portfolioModel.findOne({
        active: true,
        _id: portfolioId,
      });

      if (!portfolio) {
        return { ok: false, message: "Portfolio not found" };
      }

      // Fetch the products associated with the portfolio
      const { products } = await productServices.getProducts(portfolio._id);

      // Add productCount and calculate projectCount
      portfolio.productCount = products.length;
      portfolio.projectCount = products.reduce(
        (count, product) => count + (product.projectCount || 0),
        0
      );

      return { ok: true, portfolio };
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
      const portfolio = await portfolioCollection.findOne({ _id: portfolioId });

      if (!portfolio) {
        return { ok: false, message: "Portfolio not found" };
      }

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

      const deleteResult = await portfolioCollection.updateOne(
        { _id: portfolioId },
        { $set: { active: false } }
      );

      return deleteResult.modifiedCount === 1
        ? { ok: true, message: "Portfolio deleted successfully" }
        : { ok: false, message: "MongoDB error: Failed to delete portfolio" };
    } catch (error) {
      console.error("Error deleting portfolio:", error);
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
      const portfolio = await portfolioCollection.findOne({ _id: portfolioId });

      if (!portfolio) {
        return { ok: false, message: "Portfolio not found" };
      }

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

      const updateResult = await portfolioCollection.updateOne(
        { _id: portfolioId },
        { $set: portfolioData }
      );

      return updateResult.modifiedCount === 1
        ? { ok: true, message: "Portfolio edited successfully" }
        : { ok: false, message: "MongoDB error: Failed to edit portfolio" };
    } catch (error) {
      console.error("Error editing portfolio:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = portfolioServices;
