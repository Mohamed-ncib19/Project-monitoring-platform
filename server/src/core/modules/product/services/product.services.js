const ProductModel = require("../models/product");
const PorfolioServices = require("../../portfolio/services/portfolio.services");
const zentaoServices = require("../../zentao/services/zentao.services");

const { v4: uuidv4 } = require("uuid");
const productServices = {
  async productExists(name) {
    try {
      const productModel = await ProductModel();
      const product = await productModel.findOne({ name });

      if (product) {
        return { ok: true, exists: true, product };
      }

      return { ok: true, exists: false, message: "product does not exist" };
    } catch (error) {
      console.error("Error checking if product exists:", error);
      return {
        ok: false,
        message: "Error checking if product exists",
        details: error.message,
      };
    }
  },

  async createProduct(product, manager, porfolioZentaoId) {
    try {
      const zentaoResponse = await zentaoServices.createProduct(
        product,
        porfolioZentaoId
      );
      if (!zentaoResponse.ok) {
        console.log(zentaoResponse);
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }
      const productId = uuidv4();
      const productCollection = await ProductModel();
      const productResult = await productCollection.insertOne({
        _id: productId,
        zentaoId: zentaoResponse.data.id,
        active: true,
        ...product,
        creator: manager,
      });
      console.log("product result :", productResult);
      if (productResult.acknowledged) {
        return {
          ok: true,
          message: "product created successfully",
          id: productResult.insertedId,
        };
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

  async getProducts(portfolioId = null) {
    try {
      const productModel = await ProductModel();

      let products;
      if (portfolioId === null) {
        products = await productModel.find({ active: true }).toArray();
      } else {
        const { portfolio } = await PorfolioServices.getPortfolioById(
          portfolioId
        );
        const productIds = portfolio.products;
        products = await productModel
          .find({
            _id: { $in: productIds },
            active: true,
          })
          .toArray();
      }
      if (products) {
        return { ok: true, products };
      }

      return { ok: false, message: "No products" };
    } catch (error) {
      console.error("Error getting products:", error);
      return {
        ok: false,
        message: "Error getting products",
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

  async editProduct(productId, productData) {
    try {
      const productCollection = await ProductModel();
      // Find the portfolio to edit it
      const product = await productCollection.findOne({ _id: productId });
      if (!product) {
        return { ok: false, message: "product not found" };
      }

      // Update the portfolio in Zentao if needed
      const zentaoResponse = await zentaoServices.editProduct(
        product.zentaoId,
        productData
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      // Update the portfolio in the database
      const updateResult = await productCollection.updateOne(
        { _id: productId },
        { $set: productData }
      );
      if (updateResult.modifiedCount === 1) {
        return { ok: true, message: "product edited successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to edit product",
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

module.exports = productServices;
