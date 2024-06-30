require("dotenv").config();
const userController = require("../controllers/user.controller");
const verifyJWT = require("../../../middlewares/verifyJWT");
const checkUserActive = require("../../../middlewares/checkUserActive ");
const checkRole = require("../../../middlewares/checkRole");

async function routes(fastify, options) {
  // Get all users
  fastify.get("/users/status/:status", {
    preHandler: [
      verifyJWT,
      checkUserActive,
      checkRole("Manager", "teamlead", "teammember"),
    ],
    handler: userController.getUsersByStatus,
  });

  fastify.get("/users/roles/:role", {
    preHandler: [verifyJWT, checkUserActive, checkRole("Manager", "teamlead")],
    handler: userController.getUsersByRole,
  });

  // Get a specific user by username
  fastify.get("/users/:id", {
    preHandler: [
      verifyJWT,
      checkUserActive,
      checkRole("Manager", "teamlead", "teammember"),
    ],
    handler: userController.getUser,
  });

  // Get the current authenticated user's profile
  fastify.get("/users/me", {
    preHandler: [
      verifyJWT,
      checkUserActive,
      checkRole("Manager", "teamlead", "teammember"),
    ],
    handler: userController.getCurrentUser,
  });

  // Setup or update a specific user by username (by manager)
  fastify.put("/users/:id", {
    preHandler: [verifyJWT, checkUserActive, checkRole("Manager")],
    handler: userController.setUpUser,
  });

  // Update the current authenticated user's profile
  fastify.put("/users/me", {
    preHandler: [verifyJWT, checkUserActive],
    handler: userController.updateProfile,
  });

  // Ban a specific user by username
  fastify.delete("/users/:id/ban", {
    preHandler: [verifyJWT, checkUserActive, checkRole("Manager")],
    handler: userController.banUser,
  });

  // Unban a specific user by username
  fastify.put("/users/:id/restore", {
    preHandler: [verifyJWT, checkUserActive, checkRole("Manager")],
    handler: userController.restoreUser,
  });

  fastify.get("/users/:id/tasks", {
    preHandler: [
      verifyJWT,
      checkUserActive,
      checkRole(["Manager", "teamlead", "teammember"]),
    ],
    handler: userController.getUserTasks,
  });
}
module.exports = routes;
