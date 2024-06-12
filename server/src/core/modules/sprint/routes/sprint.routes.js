const sprintController = require("../controllers/sprint.controller");
async function routes(fastify, options) {
  fastify.get("/sprints/:sprintId", sprintController.getSprint);
}

module.exports = routes;
