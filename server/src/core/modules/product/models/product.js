const { getDB } = require("../../../libs/database");

const product = async function productModel() {
  try {
    const db = await getDB();
    const products = db.collection("products");
    return products;
  } catch (error) {
    console.error("Failed to load product model", error);
    return { ok: false, message: "Failed to load product model" };
  }
};

module.exports = product;
