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
        console.log(zentaoResponse);
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
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
  async getProjects(product) {
    try {
      const projectModel = await ProjectModel();
      let projects = [];

      if (!product || product === "all") {
        projects = await projectModel.find({}).toArray();
      } else {
        projects = await projectModel.find({ id_product: product }).toArray();
      }

      return { ok: true, projects: projects };
    } catch (error) {
      console.error("Error getting projects:", error);
      return {
        ok: false,
      };
    }
  },
};

module.exports = projectServices;
