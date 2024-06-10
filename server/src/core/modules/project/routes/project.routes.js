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

  fastify.get("/projects", {
    preHandler: [verifyJWT, checkUserActive],
    handler: projectController.getProjects,
  });

  fastify.get("/:productId/projects", {
    preHandler: [verifyJWT, checkUserActive],
    handler: projectController.getProjects,
  });

  fastify.put("/projects/:projectId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: projectController.editProject,
  });

  fastify.delete("/projects/:projectId", {
    preHandler: [verifyJWT, checkUserActive],
    handler: projectController.deleteProject,
  });
}
module.exports = routes;
