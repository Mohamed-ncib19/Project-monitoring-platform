const ProjectModel = require("../models/project");
const zentaoServices = require("../../zentao/services/zentao.services");
const { v4: uuidv4 } = require("uuid");

const projectServices = {
  async projectExists(name) {
    try {
      const projectModel = await ProjectModel();
      const project = await projectModel.findOne({ name: name });
      if (project) {
        return { ok: true, exists: true, project: project };
      }
      return { ok: true, exists: false, message: "project does not exist" };
    } catch (error) {
      console.error("Error checking if project exists:", error);
      return { ok: false, message: "Error checking if project exists" };
    }
  },
  async createProject(project, teamleader, productZentaoId) {
    try {
      const zentaoResponse = await zentaoServices.createProject(
        project,
        productZentaoId
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }
      const projectId = uuidv4();
      const projectCollection = await ProjectModel();
      const projectResult = await projectCollection.insertOne({
        _id: projectId,
        zentaoId: zentaoResponse.data.id,
        active: true,
        ...project,
        creator: teamleader,
      });
      if (projectResult.acknowledged) {
        return {
          ok: true,
          message: "project created successfully",
          id: projectResult.insertedId,
        };
      } else {
        return { ok: false, message: "MongoDB error" };
      }
    } catch (error) {
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
  async getProjects(productId = null) {
    try {
      const projectCollection = await ProjectModel();
      const projects = await projectCollection
        .find(
          productId ? { active: true, product: productId } : { active: true }
        )
        .toArray();
      return { ok: true, projects: projects };
    } catch (error) {
      console.error("Error getting projects:", error);
      return {
        ok: false,
        message: "Error getting projects",
        details: error.message,
      };
    }
  },
  async editProject(projectId, projectData) {
    try {
      const projectCollection = await ProjectModel();
      // Find the portfolio to edit it
      const project = await projectCollection.findOne({ _id: projectId });
      if (!project) {
        return { ok: false, message: "project not found" };
      }

      // Update the portfolio in Zentao if needed
      const zentaoResponse = await zentaoServices.editProject(
        project.zentaoId,
        projectData
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      // Update the portfolio in the database
      const updateResult = await projectCollection.updateOne(
        { _id: projectId },
        { $set: projectData }
      );
      if (updateResult.modifiedCount === 1) {
        return { ok: true, message: "project edited successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to edit project",
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
  async deleteProject(projectId) {
    try {
      const projectCollection = await ProjectModel();
      // Find the portfolio to delete it from Zentao as well
      const project = await projectCollection.findOne({ _id: projectId });
      if (!project) {
        return { ok: false, message: "project not found" };
      }

      // Delete the portfolio from Zentao
      const zentaoResponse = await zentaoServices.deleteProject(
        project.zentaoId
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      const deleteResult = await projectCollection.updateOne(
        { _id: projectId },
        { $set: { active: false } }
      );
      if (deleteResult.modifiedCount === 1) {
        return { ok: true, message: "project deleted successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to delete project",
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

module.exports = projectServices;
