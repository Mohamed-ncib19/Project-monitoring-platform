require("dotenv").config();

const httpStatus = require("http-status");
const projectServices = require("../services/projectServices");
const projectsController = {
  async createProject(request, reply) {
    try {
      const projectData = request.body;
      const response = await projectServices.projectExists(projectData.name);
      if (!response.exists) {
        const response = await projectsService.createProject(projectData);
        return reply.status(200).send({ error: null, data: response.project });
      } else {
        return reply.status(httpStatus.CONFLICT).send({
          error: { message: "project name already taken" },
          data: null,
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
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

  async setStatus(request, reply) {
    try {
      const { id } = request.params;
      const { status } = request.body;
      const response = await userModel.setStatus(id, status);
      if (!response.ok) {
        return reply.status(404).send({
          error: { message: "Failed to change user status" },
          data: null,
        });
      } else {
        return reply.status(200).send({
          error: null,
          data: { message: "status updated successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },

  async updateProfile(request, reply) {
    try {
      const { id } = request.params;
      const { firstName, lastName, phoneNumber } = request.body;
      const response = await userModel.updateProfile(
        id,
        firstName,
        lastName,
        phoneNumber,
        bio
      );

      if (!response.ok) {
        console.log(response);
        return reply.status(404).send({
          error: { message: "Failed to Update user informations" },
          data: null,
        });
      } else {
        return reply.status(200).send({
          error: null,
          data: { message: "Informations updated successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
};

module.exports = projectsController;
