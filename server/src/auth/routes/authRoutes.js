const authController = require("../controllers/authController");
const loginSchema = require("../schemas/loginSchema");
const registerSchema = require("../schemas/registrationSchema");
const autheticate = require("../../core/middlewares/autheticate");
require("dotenv").config();

async function routes(fastify, options) {
  fastify.post("/login", authController.login);

  fastify.post(
    "/register",
    { preHandler: autheticate },
    authController.register
  );

  fastify.post("/refresh_token", authController.refreshToken);
}

module.exports = routes;
