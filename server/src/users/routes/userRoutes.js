require("dotenv").config();
const userController = require("../controllers/userController");
const autheticate = require("../../core/middlewares/autheticate");
async function routes(fastify, options) {
  //get user data
  fastify.get("/users/:username", userController.getUser);

  //Set up user profile [Manager]
  fastify.put("/users/:username", userController.setUpAccount);

  fastify.put(
    "/users/me",
    { preHandler: autheticate },
    userController.updateProfile
  );

  //get users
  fastify.get("/users", userController.getUsers);

  //update user status
  fastify.put("/users/:id/approve", userController.approve);

  fastify.delete("/requests/:username", userController.deleteRequest);
}

module.exports = routes;
