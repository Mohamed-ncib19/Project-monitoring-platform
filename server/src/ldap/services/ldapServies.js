require("dotenv").config();

const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const ldap = require("ldapjs");

const ldapServices = {
  async bindUser(username, password) {
    const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });

    return new Promise((resolve) => {
      client.bind(userDn, password, (err) => {
        if (err) {
          console.log(err);
          client.unbind();
          resolve({ ok: false, message: err.message });
        } else {
          resolve({ ok: true, client });
        }
      });
    });
  },
  disableUser(client, dn, callback) {
    const change = new ldap.Change({
      operation: "replace",
      modification: {
        type: "pwdAccountLockedTime",
        values: ["000001010000Z"],
      },
    });
    client.modify(dn, change, (err) => {
      if (err) {
        console.error("Failed to disable user:", err);
        return callback(err);
      }
      console.log("User disabled successfully");
      callback(null);
    });
  },
  enableUser(client, dn, callback) {
    const change = new ldap.Change({
      operation: "delete",
      modification: {
        type: "pwdAccountLockedTime",
        values: [],
      },
    });
    client.modify(dn, change, (err) => {
      if (err) {
        console.error("Failed to enable user:", err);
        return callback(err);
      }
      console.log("User enabled successfully");
      callback(null);
    });
  },
  async checkUserExists(username) {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    });
    try {
      // Ensure admin bind is successful before proceeding
      await new Promise((resolve, reject) => {
        client.bind(
          "uid=admin,ou=system",
          process.env.LDAP_ADMIN_PASSWORD,
          (err) => {
            if (err) {
              return reject(
                new Error("LDAP admin bind failed: " + err.message)
              );
            } else {
              console.log("Admin connected successfully");
              resolve();
            }
          }
        );
      });
      const searchOptions = {
        filter: `(uid=${username})`,
        scope: "sub",
      };
      const userFound = await new Promise((resolve, reject) => {
        client.search(process.env.LDAP_BASE_DN, searchOptions, (err, res) => {
          if (err) {
            return reject(new Error("Search operation failed"));
          }

          let userExists = false;

          res.on("searchEntry", () => {
            userExists = true;
          });

          res.on("end", () => {
            resolve(userExists);
          });

          res.on("error", (err) => {
            reject(new Error("Search operation error: " + err.message));
          });
        });
      });

      if (userFound) {
        return { ok: true, message: "User exists" };
      } else {
        return { ok: false, message: "User does not exist" };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
};

module.exports = ldapServices;
