require("dotenv").config();
const httpStatus = require("http-status");
const productServices = require("../services/product.services");
const portfolioServices = require("../../portfolio/services/portfolio.services");
const projectServices = require("../../project/services/project.services");

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
      console.log(body);
      const { portfolio } = await portfolioServices.getPortfolioById(
        body.portfolio
      );
      const createResponse = await productServices.createProduct(
        body,
        user.id,
        portfolio.zentaoId
      );

      if (createResponse.ok) {
        return res.status(httpStatus.CREATED).send({
          message: "Product created successfully",
          product: createResponse.product,
        });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Failed to create product" });
      }
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  async getProducts(req, res) {
    try {
      let productsRes;
      const { portfolioId = null } = req.params;
      const userId = req.user._id;
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
  async getProduct(req, res) {
    try {
      const { productId } = req.params;
      console.log(productId);
      const productRes = await productServices.getProductById(productId);
      if (!productRes.ok) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: productRes.message });
      }
      return res.status(httpStatus.OK).send({ product: productRes.product });
    } catch (error) {
      console.error(error);
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
          .send({ message: "Missing product ID" });
      }

      if (!body) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing product data" });
      }

      const { exists } = await productServices.productExists(body.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "Product name already taken" });
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
  async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      if (!productId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing product ID" });
      }
      const deleteResponse = await productServices.deleteProduct(productId);
      if (deleteResponse.ok) {
        return res
          .status(httpStatus.OK)
          .send({ message: "product deleted successfully" });
      } else {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to delete product" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  async getProductUsers(req, res) {
    try {
      const { productId } = req.params;
      const usersRes = await productServices.getProductUsers(productId);
      if (usersRes.ok) {
        return res.status(httpStatus.OK).send({ members: usersRes.members });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No members found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};

module.exports = productController;
