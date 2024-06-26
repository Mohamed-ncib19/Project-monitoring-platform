const { getDB } = require("../../../libs/database");

const projectModel = async function projectModel() {
  try {
    const db = await getDB();
    const project = db.collection("projects");
    return project;
  } catch (error) {
    console.error("Failed to load project model", error);
    return { ok: false, message: "Failed to load project model" };
  }
};

module.exports = projectModel;
