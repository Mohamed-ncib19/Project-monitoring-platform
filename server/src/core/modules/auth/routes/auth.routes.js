const authController = require("../controllers/auth.controller");
const loginSchema = require("../schemas/login.schema");
const registerSchema = require("../schemas/registration.schema");
const autheticate = require("../../../middlewares/autheticate");
const refreshTokenSchema = require("../schemas/refreshToken.schema");
require("dotenv").config();

async function routes(fastify, options) {
  fastify.post("/login", authController.login);

  fastify.post("/register", authController.register);

  fastify.post("/refresh_token", {
    prehandler: autheticate,
    handler: authController.refreshToken,
  });
}

module.exports = routes;
