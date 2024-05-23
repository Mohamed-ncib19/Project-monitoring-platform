require("dotenv").config();

const httpStatus = require("http-status");
const userServices = require("../services/userServices");

const userController = {
  async getUser(request, reply) {
    try {
      const { username } = request.params;
      const response = await userServices.userExists(username);
      if (response.ok) {
        return reply.status(200).send({ error: null, data: response.user });
      } else {
        return reply
          .status(404)
          .send({ error: { message: "User not found" }, data: null });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async getCurrentUser(request, reply) {
    try {
      const { username } = request.user;
      console.log(username);
      const response = await userServices.userExists(username);
      if (response.ok) {
        return reply.status(200).send({ error: null, data: response.user });
      } else {
        return reply
          .status(404)
          .send({ error: { message: "User not found" }, data: null });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async getUsers(request, reply) {
    try {
      let response;
      const { pending } = request.query;
      if (pending == "true") {
        response = await userServices.getUsers(true);
      } else {
        response = await userServices.getUsers(false);
      }
      console.log(response);
      if (response.ok) {
        return reply.status(200).send({ error: null, data: response.users });
      } else {
        return reply
          .status(404)
          .send({ error: { message: "Users not found" }, data: null });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async setUpAccount(request, reply) {
    try {
      const { username } = request.params;
      const userUpdates = request.body;
      const response = await userServices.setUpAccount(username, userUpdates);
      if (!response.ok) {
        return reply.status(404).send({
          error: { message: "Failed to Update user informations" },
          data: null,
        });
      } else {
        return reply.status(200).send({
          error: null,
          data: { message: "Informations updated successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async updateProfile(request, reply) {
    try {
      const { username } = request.user;
      const updates = request.body;
      const response = await userServices.updateProfile(username, updates);
      if (!response.ok) {
        return reply.status(404).send({
          error: { message: "Failed to Update user informations" },
          data: null,
        });
      } else {
        return reply.status(200).send({
          error: null,
          data: { message: "Informations updated successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async approve(request, reply) {
    try {
      const { username } = request.params;
      const response = await userServices.approve(username);
      if (!response.ok) {
        return reply.status(404).send({
          error: { message: "Failed to change user status" },
          data: null,
        });
      } else {
        return reply.status(200).send({
          error: null,
          data: { message: "status updated successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
  async deleteRequest(request, reply) {
    try {
      const { username } = request.params;
      const response = await userServices.deleteRequest(username);
      if (!response.ok) {
        return reply.status(404).send({
          error: { message: "Failed to Delete request" },
          data: null,
        });
      } else {
        return reply.status(200).send({
          error: null,
          data: { message: "Request deleted successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
        data: null,
      });
    }
  },
};

module.exports = userController;
