require("dotenv").config();
const projectController = require("../controllers/project.controller");
const verifyJWT = require("../../../middlewares/verifyJWT");
const checkUserActive = require("../../../middlewares/checkUserActive ");

async function routes(fastify, options) {
  //Create project
  fastify.post("/projects", {
    preHandler: [verifyJWT, checkUserActive],
    handler: projectController.createProject,
  }); //Get projects
  fastify.get("/projects", projectController.getProjects);
}

module.exports = routes;
