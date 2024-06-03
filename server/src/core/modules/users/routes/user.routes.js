require("dotenv").config();
const userController = require("../controllers/user.controller");
const verifyJWT = require("../../../middlewares/verifyJWT");
const checkUserActive = require("../../../middlewares/checkUserActive ");

async function routes(fastify, options) {
  // Get all users
  fastify.get("/users", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.getUsers,
  });

  // Get a specific user by username
  fastify.get("/users/:username", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.getUser,
  });

  // Get the current authenticated user's profile
  fastify.get("/users/me", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.getCurrentUser,
  });

  // Setup or update a specific user by username (by manager)
  fastify.put("/users/:username", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.setUpUser,
  });

  // Update the current authenticated user's profile
  fastify.put("/users/me", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.updateProfile,
  });

  // Ban a specific user by username
  fastify.delete("/users/:username/ban", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.banUser,
  });

  // Unban a specific user by username
  fastify.put("/users/:username/restore", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.restoreUser,
  });
}
module.exports = routes;
