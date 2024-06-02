require("dotenv").config();
const userController = require("../controllers/user.controller");
const autheticate = require("../../../middlewares/autheticate");
async function routes(fastify, options) {
  // Get all users
  fastify.get("/users", {
    preHandler: autheticate,
    handler: userController.getUsers,
  });

  // Get a specific user by username
  fastify.get("/users/:username", {
    preHandler: autheticate,
    handler: userController.getUser,
  });

  // Get the current authenticated user's profile
  fastify.get("/users/me", {
    preHandler: autheticate,
    handler: userController.getCurrentUser,
  });

  // Setup or update a specific user by username (by manager)
  fastify.put("/users/:username", {
    preHandler: autheticate,
    handler: userController.setUpUser,
  });

  // Update the current authenticated user's profile
  fastify.put("/users/me", {
    preHandler: autheticate,
    handler: userController.updateProfile,
  });

  // Ban a specific user by username
  fastify.delete("/users/:username/ban", {
    preHandler: autheticate,
    handler: userController.banUser,
  });

  // Unban a specific user by username
  fastify.put("/users/:username/restore", {
    handler: userController.restoreUser,
  });
}
module.exports = routes;
