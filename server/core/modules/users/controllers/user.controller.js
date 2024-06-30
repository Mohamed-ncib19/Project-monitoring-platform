require("dotenv").config();

const httpStatus = require("http-status");
const userServices = require("../services/user.services");
const ldapServices = require("../services/ldap.services");
const userController = {
  async getUser(request, reply) {
    try {
      const { id } = request.params;
      const response = await userServices.userExists(id);
      if (response.ok) {
        return reply.status(200).send({ user: response.user });
      } else {
        return reply.status(404).send({ error: { message: "User not found" } });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async getCurrentUser(request, reply) {
    try {
      const { id } = request.user;
      const response = await userServices.userExists(id);
      if (response.ok) {
        return reply.status(httpStatus.OK).send({ user: response.user });
      } else {
        return reply
          .status(httpStatus.NOT_FOUND)
          .send({ error: { message: "User not found" } });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async getUsersByStatus(request, reply) {
    try {
      let response;
      const { status } = request.params;

      response = await userServices.getUsersByStatus(status);

      if (response.ok) {
        return reply.status(httpStatus.OK).send({ users: response.users });
      } else {
        return reply
          .status(httpStatus.NOT_FOUND)
          .send({ error: { message: "Users not found" } });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async getUsersByRole(request, reply) {
    try {
      let response;
      const { role } = request.params;
      if (role !== "all") {
        response = await userServices.getUsersByRole(role);
      } else {
        response = await userServices.getUsersByRole();
      }
      console.log(response);
      if (response.ok) {
        return reply.status(httpStatus.OK).send({ users: response.users });
      } else {
        return reply
          .status(httpStatus.NOT_FOUND)
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
      const { id } = request.params;
      const userUpdates = request.body;
      const response = await userServices.setUpUser(id, userUpdates);
      if (!response.ok) {
        return reply.status(httpStatus.NOT_FOUND).send({
          message: "Failed to setup user account",
        });
      } else {
        return reply.status(httpStatus.OK).send({
          message: "Account setted up successfuly",
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async updateProfile(request, reply) {
    try {
      const { id } = request.user;
      const updates = request.body;
      const response = await userServices.updateProfile(id, updates);
      if (!response.ok) {
        return reply.status(httpStatus.NOT_FOUND).send({
          error: { message: "Failed to Update user informations" },
        });
      } else {
        return reply.status(httpStatus.OK).send({
          message: "Informations updated successfuly",
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async banUser(request, reply) {
    try {
      const { id } = request.params;
      const { type } = request.query;
      const user = await userServices.userExists(id);
      const { username } = user.user;
      console.log(username);
      const blockResponse = await ldapServices.disableUser(username);
      if (!blockResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Ban User" },
        });
      }
      const banResponse = await userServices.banUser(id, type);
      if (!banResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Ban User" },
        });
      } else {
        return reply.status(httpStatus.OK).send({
          message: "User banned successfuly",
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
      const { id } = request.params;
      const { type } = request.query;
      const user = await userServices.userExists(id);
      const { username } = user.user;
      const unblockResponse = await ldapServices.enableUser(username);
      if (!unblockResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Restore User" },
        });
      }
      const banResponse = await userServices.restoreUser(id, type);
      if (!banResponse.ok) {
        return reply.status(httpStatus.NOT_MODIFIED).send({
          error: { message: "Failed to Restore User" },
        });
      } else {
        return reply.status(httpStatus.OK).send({
          message: "User Restored successfuly",
        });
      }
    } catch (error) {
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: { message: "Internal server error", details: error.message },
      });
    }
  },
  async getUserTasks(request, reply) {
    try {
      const { id } = request.params;
      const tasksRes = await userServices.getUserTasks(id);
      if (!tasksRes.ok) {
        return reply.status(httpStatus.NOT_FOUND).send({
          message: "failed to load user tasks",
          details: tasksRes.message,
        });
      }
      return reply.status(httpStatus.OK).send({ tasks: tasksRes.tasks });
    } catch (error) {
      console.error(error);
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};

module.exports = userController;
