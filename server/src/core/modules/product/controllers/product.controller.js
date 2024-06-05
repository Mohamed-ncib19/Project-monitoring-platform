require("dotenv").config();
const httpStatus = require("http-status");
const productServices = require("../services/product.services");
const portfolioServices = require("../../portfolio/services/portfolio.services");

const productController = {
  async createProduct(req, res) {
    try {
      const { body, user } = req;
      if (!body || !body.name) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing product data or name" });
      }

      const { exists } = await productServices.productExists(body.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "Product name already taken" });
      }
      const { portfolio } = await portfolioServices.getPortfolioById(
        body.portfolio
      );
      const createResponse = await productServices.createProduct(
        body,
        user.id,
        portfolio.zentaoId
      );
      if (createResponse.ok) {
        const addToPorfolioResponse = await portfolioServices.addProduct(
          body.portfolio,
          createResponse.id
        );
        if (addToPorfolioResponse.ok) {
          return res.status(httpStatus.CREATED).send({
            message: "Product created successfully",
            product: createResponse.product,
          });
        } else {
          return res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "Failed to add product to porfolio" });
        }
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Failed to create product" });
      }
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error,
      });
    }
  },

  async getProducts(req, res) {
    try {
      let productsRes;
      const { portfolioId = null } = req.params;
      if (!portfolioId) {
        productsRes = await productServices.getProducts();
      } else {
        productsRes = await productServices.getProducts(portfolioId);
      }

      if (productsRes.ok) {
        return res
          .status(httpStatus.OK)
          .send({ products: productsRes.products });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No products found" });
      }
    } catch (error) {
      console.error(error);
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

  async editProduct(req, res) {
    try {
      const { productId } = req.params;
      const { body } = req;

      if (!productId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio ID" });
      }

      if (!body) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing portfolio data" });
      }

      const editResponse = await productServices.editProduct(productId, body);
      if (editResponse.ok) {
        return res
          .status(httpStatus.OK)
          .send({ message: "product edited successfully" });
      } else {
        console.log(editResponse);
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "product not found" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};

module.exports = productController;
