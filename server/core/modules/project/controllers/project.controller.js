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
          .send({ message: "Missing project data or name" });
      }
      const { exists } = await projectServices.projectExists(body.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "Project name already taken" });
      }
      const { product } = await productServices.getProductById(
        body.product,
        true
      );
      const createResponse = await projectServices.createProject(
        body,
        user.id,
        product.zentaoId
      );
      if (createResponse.ok) {
        return res.status(httpStatus.CREATED).send({
          message: "Project created successfully",
        });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Failed to create project" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error,
      });
    }
  },

  async getProjects(req, res) {
    try {
      let projectsRes;
      const { productId = null } = req.params;
      if (!productId) {
        projectsRes = await projectServices.getProjects();
      } else {
        projectsRes = await projectServices.getProjects(productId);
      }

      if (projectsRes.ok) {
        return res
          .status(httpStatus.OK)
          .send({ projects: projectsRes.projects });
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "No projects found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async editProject(req, res) {
    try {
      const { projectId } = req.params;
      const { body } = req;

      if (!projectId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing project ID" });
      }

      if (!body) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing project data" });
      }

      const { exists } = await projectServices.projectExists(body.name);
      if (exists) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ message: "project name already taken" });
      }
      const editResponse = await projectServices.editProject(projectId, body);
      if (editResponse.ok) {
        return res
          .status(httpStatus.OK)
          .send({ message: "project edited successfully" });
      } else {
        console.log(editResponse);
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "project not found" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async deleteProject(req, res) {
    try {
      const { projectId } = req.params;
      if (!projectId) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Missing project ID" });
      }
      const deleteResponse = await projectServices.deleteProject(projectId);
      if (deleteResponse.ok) {
        return res
          .status(httpStatus.OK)
          .send({ message: "project deleted successfully" });
      } else {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to delete project" });
      }
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  async getProjectTasks(req, res) {
    try {
      const { projectId } = req.params;
      const tasksRes = await projectServices.getProjectTasks(projectId);
      if (!tasksRes.ok) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "failed to load project tasks",
          details: tasksRes.message,
        });
      }
      return res.status(httpStatus.OK).send({ tasks: tasksRes.tasks });
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};

module.exports = projectController;
