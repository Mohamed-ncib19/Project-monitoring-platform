const { getDB } = require("../../../libs/database");

const sprint = async function sprintModel() {
  try {
    const db = await getDB();
    const products = db.collection("sprints");
    return products;
  } catch (error) {
    console.error("Failed to load sprints model", error);
    return { ok: false, message: "Failed to load sprints model" };
  }
};

module.exports = sprint;
