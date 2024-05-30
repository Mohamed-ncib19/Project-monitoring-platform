require("dotenv").config();
const ldap = require("ldapjs");

const ldapModel = async function userModel() {
  try {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });
    console.log("User bined successfully");
    return client;
  } catch (error) {
    console.error("Failed to load user model", error);
    return { ok: false, message: "Failed to load user model" };
  }
};

module.exports = ldapModel;
