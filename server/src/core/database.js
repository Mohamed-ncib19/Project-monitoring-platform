const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
let client = null; 

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    try {
      await client.connect();
      console.log("Connected to the database");
      await createIndexes(client.db());
    } catch (err) {
      console.error("Failed to connect to the database:", err);
      process.exit(1);
    }
  }
}

async function createIndexes(db) {
  try {
    // Create a nique index on the email field
    await db.collection("users").createIndex({ username: 1 }, { unique: true });
    console.log('Unique index created on "username" field');
  } catch (error) {
    console.error("Error creating index:", error);
    throw error;
  }
}

async function getDB() {
  await connectDB();
  return client.db();
}

module.exports = { connectDB, getDB };
