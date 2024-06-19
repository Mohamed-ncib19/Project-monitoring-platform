const { getDB } = require("../../../libs/database");

const task = async function taskModel() {
  try {
    const db = await getDB();
    const products = db.collection("tasks");
    return products;
  } catch (error) {
    console.error("Failed to load tasks model", error);
    return { ok: false, message: "Failed to load tasks model" };
  }
};

module.exports = task;
