const { MongoClient } = require("mongodb");
const config = require("../../config");

const uri = config.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
}

async function getDB() {
  await connectDB();
  return client.db();
}

module.exports = { connectDB, getDB };
