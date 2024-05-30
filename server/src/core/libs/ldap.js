require("dotenv").config();
const ldap = require("ldapjs");

const ldapClient = async function ldapClient() {
  try {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });
    await new Promise((resolve, reject) => {
      client.bind(
        "uid=admin,ou=system",
        process.env.LDAP_ADMIN_PASSWORD,
        (err) => {
          if (err) {
            return reject(new Error("LDAP admin bind failed: " + err.message));
          } else {
            console.log("Admin connected successfully");
            resolve();
          }
        }
      );
    });
    return client;
  } catch (error) {
    console.error("Failed to load user model", error);
    return { ok: false, message: "Failed to load user model" };
  }
};

module.exports = ldapClient;
