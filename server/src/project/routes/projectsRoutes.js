require("dotenv").config();
const projectsController = require("../controllers/projectsController");

async function routes(fastify, options) {
  //Create project
  fastify.post("/projects", projectsController.createProject);

  //Get projects
  fastify.get("/projects", projectsController.getProjects);

  /*
  //Get project by id0
  fastify.get("/projects/:id");

  //Edit project
  fastify.put("/projects/:id");

  //delete project
  fastify.delete("/projects/:id"); */
}

module.exports = routes;
