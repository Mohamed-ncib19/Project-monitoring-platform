const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const UserModel = require("../models/user");
const TaskModel = require("../../tasks/models/task");
const ProductModel = require("../../product/models/product");
const ProjectModel = require("../../project/models/project");
const SprintModel = require("../../sprint/models/sprint");

const { v4: uuidv4 } = require("uuid");
const taskModel = require("../../tasks/models/task");

const userServices = {
  async userExists(username, byUsername = 0) {
    try {
      const userModel = await UserModel();
      let user;
      if (byUsername) {
        user = await userModel.findOne({ username: username });
      } else {
        user = await userModel.findOne({ _id: username });
      }
      if (user) {
        return { ok: true, exists: true, user: user };
      }
      return { ok: true, exists: false, message: "user does not exist" };
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return { ok: false, message: "Error checking if user exists" };
    }
  },

  async getUser(field, value) {
    try {
      const userModel = await UserModel();
      const query = { active: true };
      query[field] = value;
      user = await userModel.findOne(query);
      if (user) {
        return { ok: true, user: user };
      }
      return { ok: true, exists: false, message: "user does not exist" };
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return { ok: false, message: "Error checking if user exists" };
    }
  },
  async createUser(user) {
    try {
      const userModel = await UserModel();
      const userId = uuidv4();
      const result = await userModel.insertOne({
        _id: userId,
        ...user,
        status: "pending",
        joinedAt: new Date(),
      });
      if (result.acknowledged) return { ok: true, userId: result.insertedId };
      else {
        return { ok: false };
      }
    } catch (error) {
      return { ok: false, status: httpStatus.CONFLICT };
    }
  },

  async getUsersByStatus(option = null) {
    try {
      let users;
      const userModel = await UserModel();
      const query =
        option === "banned"
          ? { $or: [{ status: "declined" }, { active: false }] }
          : option === "active"
          ? { active: true }
          : option === "pending"
          ? { status: option }
          : null;
      if (!query) {
        return { ok: false, message: "invalid query options" };
      }
      users = await userModel.find(query).toArray();
      return { ok: true, users: users };
    } catch (error) {
      console.error("Error getting users:", error);
      return { ok: false, status: httpStatus.NOT_FOUND };
    }
  },

  async getUsersByRole(role = null) {
    try {
      let users;
      const userModel = await UserModel();
      if (role !== null) {
        users = await userModel.find({ role: role, active: true }).toArray();
      } else {
        users = await userModel.find({ active: true }).toArray();
      }
      return { ok: true, users };
    } catch (error) {
      console.error("Error getting users:", error);
      return { ok: false, status: httpStatus.NOT_FOUND };
    }
  },

  async updateProfile(id, updates) {
    try {
      const userModel = await UserModel();
      const updateObject = {};

      const allowedFields = ["firstname", "lastname", "phone", "bio"];

      for (const key in updates) {
        // Check if the field is allowed before adding it to the update object
        if (allowedFields.includes(key)) {
          updateObject[key] = updates[key];
        }
      }
      const result = await userModel.updateOne(
        { _id: id },
        { $set: updateObject }
      );
      if (result.acknowledged) return { ok: true };
      else {
        return { ok: false };
      }
    } catch (error) {
      console.error("Error updating profile", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },

  async setUpUser(id, updates) {
    try {
      const userModel = await UserModel();
      const updateObject = {};

      const allowedFields = [
        "firstname",
        "lastname",
        "phone",
        "email",
        "role",
        "salary",
        "businessPosition",
      ];
      for (const key in updates) {
        // Check if the field is allowed before adding it to the update object
        if (allowedFields.includes(key)) {
          updateObject[key] = updates[key];
        }
      }

      const result = await userModel.updateOne(
        { _id: id },
        {
          $set: {
            ...updateObject,
            status: "approved",
            active: true,
          },
        }
      );
      if (result.modifiedCount) return { ok: true };
      else return { ok: false };
    } catch (error) {
      console.error("Error updating profile", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },

  async banUser(id, type) {
    try {
      const updateField =
        type === "request" ? { status: "declined" } : { active: false };

      const userModel = await UserModel();
      const result = await userModel.updateOne(
        { _id: id },
        { $set: { ...updateField, bannedAt: new Date() } }
      );
      if (result.acknowledged) return { ok: true };
      else {
        return { ok: false };
      }
    } catch (error) {
      console.error("Error Deleting request / user", error);
      return { ok: false };
    }
  },

  async restoreUser(id, type) {
    try {
      const userModel = await UserModel();
      const updateField =
        type === "request"
          ? { status: "pending" }
          : { active: true, status: "approved" };
      const updateObject = { $set: updateField, $unset: { bannedAt: "" } };

      const result = await userModel.updateOne({ _id: id }, updateObject);
      if (result.acknowledged) return { ok: true };
      else {
        return { ok: false };
      }
    } catch (error) {
      console.error("Error Restoring user", error);
      return { ok: false };
    }
  },

  async managePorfolio(id, portfolioId) {
    try {
      console.log(id, "--", portfolioId);
      const userModel = await UserModel();
      const { user } = await userServices.userExists(id);
      let result;
      if (user.managedPortfolios) {
        result = await userModel.updateOne(
          { _id: user.id },
          { $addToSet: { managedPortfolios: portfolioId } }
        );
      } else {
        result = await userModel.updateOne(
          { _id: id },
          { $set: { managedPortfolios: [portfolioId] } }
        );
      }
      if (result.acknowledged) return { ok: true };
      else {
        return { ok: false };
      }
    } catch (error) {
      console.error("Error assigning manager to manage porfolio", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },

  async getUserTasks(id) {
    try {
      const taskCollection = await taskModel();
      const tasks = await taskCollection
        .find({ assignedTo: id, status: "done" })
        .toArray();
      return { ok: true, tasks };
    } catch (error) {
      console.log(error);
      return { ok: false, message: "failed to get user tasks" };
    }
  },
  async memberDashboard(id) {
    try {
      const dashboardData = {};
      const taskCollection = await TaskModel();
      const projectCollection = await ProjectModel();
      const sprintCollection = await SprintModel();

      const projects = await projectCollection
        .find({ members: { $in: [id] } })
        .toArray();
      dashboardData.projectCount = projects.length;

      const products = projects.map((project) => project.product);
      const uniqueProductIds = [...new Set(products)];
      dashboardData.productCount = uniqueProductIds.length;

      let tasks = await taskCollection
        .find({
          assignedTo: id,
        })
        .toArray();

      let toDoTasksCount = 0;
      let totalEstimated = 0;
      let totalConsumed = 0;

      for (const task of tasks) {
        if (task.status === "wait") {
          toDoTasksCount += 1;
        } else if (task.status === "done") {
          totalEstimated += task.estimated;
          totalConsumed += task.consumed;
        }

        const sprint = await sprintCollection.findOne({ _id: task.sprint });
        if (sprint) {
          const project = await projectCollection.findOne({
            _id: sprint.project,
          });
          if (project) {
            task.project = project.name;
          }
        }
      }
      dashboardData.toDoTasksCount = toDoTasksCount;
      dashboardData.totalEstimated = totalEstimated;
      dashboardData.totalConsumed = totalConsumed;
      dashboardData.tasks = tasks;

      console.log(dashboardData);

      return;

      console.log(dashboardData);
      return;

      return { ok: true, tasks };
    } catch (error) {
      console.log(error);
      return { ok: false, message: "failed to get user tasks" };
    }
  },
};

module.exports = userServices;
