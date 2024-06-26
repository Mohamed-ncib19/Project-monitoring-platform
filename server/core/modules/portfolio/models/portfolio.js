const { getDB } = require("../../../libs/database");

const portfolio = async function portfolioModel() {
  try {
    const db = await getDB();
    const portfolio = db.collection("portfolios");
    return portfolio;
  } catch (error) {
    console.error("Failed to load portfolio model", error);
    return { ok: false, message: "Failed to load portfolio model" };
  }
};

module.exports = portfolio;
