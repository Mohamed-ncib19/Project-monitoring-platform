const { getDB } = require("../database/database");

const userModel = {
  async userExists(email) {
    try {
      const db = await getDB();
      const user = await db.collection("users").findOne({ email: email });
      if (user) {
        return { ok: true, user: user };
      }
      return { ok: false, message: "user does not exist" };
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return { ok: false, message: "Error checking if user exists" };
    }
  },
  async createUser(user) {
    try {
      const db = await getDB();
      const result = await db.collection("users").insertOne(user);
      if (result.acknowledged) return { ok: true };
      return { ok: false };
    } catch (error) {
      console.error("Error creating user:", error);
      return { ok: false, message: "Error creating user" }; // Return an error object
    }
  },
};

module.exports = userModel;
