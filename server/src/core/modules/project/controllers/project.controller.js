require("dotenv").config();

const httpStatus = require("http-status");
const projectServices = require("../services/project.services");
const productServices = require("../../product/services/product.services");

const projectController = {
  async createProject(req, res) {
    try {
      const { body, user } = req;
      if (!body || !body.name) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing product data or name" });
      }

      const { exists } = await projectServices.projectExists(body.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "Project name already taken" });
      }
      const product = await productServices.getProductById(body.product);
      console.log(product);
      const createResponse = await projectServices.createProject(
        body,
        user.id,
        product.zentaoId
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
        details: error,
      });
    }
  },

  async getProjects(request, reply) {
    try {
      const { product = "all" } = request.query;
      //check if product exists
      const response = await projectServices.getProjects(product);
      if (!response.ok) {
        return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: { message: "Internal server error", details: error.message },
          data: null,
        });
      } else if (response.projects.length == 0) {
        return reply
          .status(httpStatus.NOT_FOUND)
          .send({ error: { message: "can't find projects" }, data: null });
      } else {
        return reply
          .status(httpStatus.OK)
          .send({ error: null, data: response.projects });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
};

module.exports = projectController;
