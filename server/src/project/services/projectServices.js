const httpStatus = require("http-status");
const ProjectModel = require("../models/projectModel");

const projectServices = {
  async projectExists(name) {
    try {
      const projectModel = await ProjectModel();
      const project = await projectModel.findOne({ name: name });
      console.log(project);
      if (project) {
        return { ok: true, exists: true, project: project };
      }
      return { ok: true, exists: false, message: "project does not exist" };
    } catch (error) {
      console.error("Error checking if project exists:", error);
      return { ok: false, message: "Error checking if project exists" };
    }
  },
  async createProject(project) {
    try {
      const projectModel = await ProjectModel();
      const result = await projectModel.insertOne({
        ...project,
        status: "pending",
        role: null,
      });
      if (result.acknowledged) return { ok: true, status: httpStatus.CREATED };
    } catch (error) {
      console.error("Error creating project:", error);
      return { ok: false, status: httpStatus.CONFLICT };
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
