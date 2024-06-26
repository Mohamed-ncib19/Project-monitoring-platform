require("dotenv").config();
const verifyJWT = require("../../../middlewares/verifyJWT");
const checkUserActive = require("../../../middlewares/checkUserActive ");
const taskController = require("../controllers/task.controller");
async function routes(fastify, options) {
  fastify.get("/tasks", {
    prehandler: [verifyJWT, checkUserActive],
    handler: taskController.getTasks,
  });
}
module.exports = routes;
