require("dotenv").config();
const userController = require("../controllers/userController");
const autheticate = require("../../core/middlewares/autheticate");
const getCurrentUserSchema = require("../schemas/getCurrentUserSchema");
async function routes(fastify, options) {
  //get user data
  fastify.get("/users/:username", userController.getUser);

  fastify.get("/users/me", {
    schema: getCurrentUserSchema,
    preHandler: autheticate,
    handler: userController.getCurrentUser,
  });

  //Set up user profile [Manager]
  fastify.put("/users/:username", userController.setUpAccount);

  fastify.put(
    "/users/me",
    { preHandler: autheticate },
    userController.updateProfile
  );

  //get users
  fastify.get("/users", userController.getUsers);

  fastify.delete("/requests/:username", userController.deleteRequest);
}

module.exports = routes;
