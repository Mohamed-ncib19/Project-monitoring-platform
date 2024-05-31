require("dotenv").config();

const httpStatus = require("http-status");
const projectServices = require("../services/project.services");
const projectController = {
  async createProject(request, reply) {
    try {
      const projectData = request.body;
      const existResponse = await projectServices.projectExists(
        projectData.name
      );
      if (!existResponse.exists) {
        const createResponse = await projectServices.createProject(projectData);
        if (createResponse.ok) {
          return reply
            .status(httpStatus.OK)
            .send({ message: "Project created successfuly" });
        } else {
          return reply.status(httpStatus.NOT_FOUND).send({
            error: { message: "Failed to create project" },
          });
        }
      } else {
        return reply.status(httpStatus.CONFLICT).send({
          error: { message: "project name already taken" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
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
