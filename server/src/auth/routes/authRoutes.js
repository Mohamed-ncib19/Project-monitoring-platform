const authController = require("../controllers/authController");
const loginSchema = require("../schemas/loginSchema");
const registerSchema = require("../schemas/registrationSchema");
const autheticate = require("../../core/middlewares/autheticate");
const refreshTokenSchema = require("../schemas/refreshTokenSchema");
require("dotenv").config();

async function routes(fastify, options) {
  fastify.post("/login", authController.login);

  fastify.post("/register", {
    handler: authController.register,
  });
  fastify.post(
    "/refresh_token",
    refreshTokenSchema,
    authController.refreshToken
  );
}

module.exports = routes;
