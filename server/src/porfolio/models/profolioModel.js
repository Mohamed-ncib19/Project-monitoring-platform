const { getDB } = require("../../core/database");

const porfolioModel = async function porfolioModel() {
  try {
    const db = await getDB();
    const porfolio = db.collection("porfolios");
    return porfolio;
  } catch (error) {
    console.error("Failed to load porfolio model", error);
    return { ok: false, message: "Failed to load porfolio model" };
  }
};

module.exports = porfolioModel;
