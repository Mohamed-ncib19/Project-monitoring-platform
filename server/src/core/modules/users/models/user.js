const { getDB } = require("../../../libs/database");

const userModel = async function userModel() {
  try {
    const db = await getDB();
    const user = db.collection("users");
    return user;
  } catch (error) {
    console.error("Failed to load user model", error);
    return { ok: false, message: "Failed to load user model" };
  }
};

module.exports = userModel;
