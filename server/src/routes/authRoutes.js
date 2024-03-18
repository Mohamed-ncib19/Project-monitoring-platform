const authController = require("../controllers/authController");
const loginSchema = require("../schemas/swaggerLogin");

async function routes(fastify, options) {
  fastify.post("/login", loginSchema, authController.login);
}

module.exports = routes;
