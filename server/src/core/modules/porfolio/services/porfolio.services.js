const PorfolioModel = require("../models/profolio");

const porfolioServices = {
  async porfolioExists(name) {
    try {
      const porfolioModel = await PorfolioModel();
      const porfolio = await porfolioModel.findOne({ name: name });
      console.log(porfolio);
      if (porfolio) {
        return { ok: true, exists: true, porfolio: porfolio };
      }
      return { ok: true, exists: false, message: "porfolio does not exist" };
    } catch (error) {
      console.error("Error checking if project exists:", error);
      return { ok: false, message: "Error checking if porfolio exists" };
    }
  },
  async createporfolio(porfolio) {
    try {
      const porfolioModel = await PorfolioModel();
      const result = await porfolioModel.insertOne({
        ...porfolio,
        createdAt: new Date(),
      });
      if (result.acknowledged) return { ok: true };
      else {
        return { ok: false };
      }
    } catch (error) {
      console.error("Error creating porfolio:", error);
      return { ok: false };
    }
  },
};

module.exports = porfolioServices;
