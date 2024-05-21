const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const UserModel = require("../models/userModel");

const userServices = {
  async userExists(username) {
    try {
      const userModel = await UserModel();
      const user = await userModel.findOne({ username: username });
      console.log(user);
      if (user) {
        return { ok: true, exists: true, user: user };
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
      const result = await userModel.insertOne({
        ...user,
        status: "pending",
        joinedAt: new Date(),
      });
      if (result.acknowledged) return { ok: true, status: httpStatus.CREATED };
    } catch (error) {
      console.error("Error creating user:", error);
      return { ok: false, status: httpStatus.CONFLICT };
    }
  },

  async getUsers(pending) {
    try {
      let users;
      const userModel = await UserModel();
      if (pending) {
        users = await userModel.find({ status: "pending" }).toArray();
      } else {
        users = await userModel.find({}).toArray();
      }
      return { ok: true, users: users };
    } catch (error) {
      console.error("Error getting users:", error);
      return { ok: false, status: httpStatus.NOT_FOUND };
    }
  },

  async approve(id) {
    try {
      const userModel = await UserModel();
      const result = await userModel.updateOne(
        { username: id },
        {
          $set: {
            status: "approved",
            active: true,
          },
        }
      );
      if (result.acknowledged) return { ok: true, status: httpStatus.CREATED };
    } catch (error) {
      console.error("Error updating status:", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },

  async updateProfile(username, updates) {
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
        { username: username },
        { $set: updateObject }
      );
      console.log(username);
      if (result.acknowledged) return { ok: true };
    } catch (error) {
      console.error("Error updating profile", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },

  async setUpAccount(username, updates) {
    try {
      const userModel = await UserModel();
      const updateObject = {};

      const allowedFields = [
        "firstname",
        "lastname",
        "phone",
        "bio",
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
        { username: username },
        { $set: updateObject }
      );
      if (result.acknowledged) return { ok: true };
    } catch (error) {
      console.error("Error updating profile", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },

  async deleteRequest(username) {
    try {
      const userModel = await UserModel();
      const result = await userModel.updateOne(
        { username: username },
        { $set: { status: "declined" } }
      );
      if (result.acknowledged) return { ok: true };
    } catch (error) {
      console.error("Error Deleting request", error);
      return { ok: false, status: httpStatus.NOT_MODIFIED };
    }
  },
};

module.exports = userServices;
