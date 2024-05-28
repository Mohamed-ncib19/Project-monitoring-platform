require("dotenv").config();

const httpStatus = require("http-status");
const userServices = require("../services/userServices");
const ldapServices = require("../../ldap/services/ldapServies");
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
      const { active, pending, banned } = request.query;
      const status =
        active === "true"
          ? "active"
          : pending === "true"
          ? "pending"
          : banned === "true"
          ? "banned"
          : false;
      response = await userServices.getUsers(status);

      console.log(response);
      if (response.ok) {
        return reply.status(200).send({ users: response.users });
      } else {
        return reply
          .status(404)
          .send({ error: { message: "Users not found" } });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async setUpUser(request, reply) {
    try {
      const { username } = request.params;
      const userUpdates = request.body;
      const response = await userServices.setUpUser(username, userUpdates);
      if (!response.ok) {
        return reply.status(404).send({
          message: "Failed to setup user account",
        });
      } else {
        return reply.status(200).send({
          message: "Account setted up successfuly",
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
  async banUser(request, reply) {
    try {
      const { username } = request.params;
      const { type } = request.query;
      const blockResponse = await ldapServices.disableUser(username);
      if (!blockResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Ban User" },
        });
      }
      const banResponse = await userServices.banUser(username, type);
      if (!banResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Ban User" },
        });
      } else {
        return reply.status(httpStatus.OK).send({
          error: { message: "User banned successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async restoreUser(request, reply) {
    try {
      const { username } = request.params;
      const { type } = request.query;
      const unblockResponse = await ldapServices.enableUser(username);
      if (!unblockResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Restore User" },
        });
      }
      const banResponse = await userServices.restoreUser(username, type);
      if (!banResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Restore User" },
        });
      } else {
        return reply.status(httpStatus.OK).send({
          error: { message: "User Restored successfuly" },
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
};

module.exports = userController;
