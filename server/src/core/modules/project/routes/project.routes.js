require("dotenv").config();
const projectController = require("../controllers/project.controller");

async function routes(fastify, options) {
  //Create project
  fastify.post("/projects", projectController.createProject);
  //Get projects
  fastify.get("/projects", projectController.getProjects);

  fastify.post("/webhook", async (request, reply) => {
    try {
      // Process the webhook payload
      const payload = request.body;

      // Perform actions based on the payload
      console.log("Received webhook payload:", payload);

      // Send a response back to the webhook provider
      reply.code(200).send({ success: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      reply.code(500).send({ success: false, error: "Internal Server Error" });
    }
  }); /*
  //Get project by id0
  fastify.get("/projects/:id");

  //Edit project
  fastify.put("/projects/:id");

  //delete project
  fastify.delete("/projects/:id"); */
}

module.exports = routes;
