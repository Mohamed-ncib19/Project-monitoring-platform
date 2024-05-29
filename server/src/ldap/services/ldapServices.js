require("dotenv").config();

const ldap = require("ldapjs");
const ldapAdminModel = require("../models/ldapAdminModel");
const ldapModel = require("../models/ldapModel");

const ldapServices = {
  async bindUser(username, password) {
    const client = await ldapModel();
    const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;
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
  async disableUser(username) {
    try {
      const client = await ldapAdminModel();
      const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;
      const change = new ldap.Change({
        operation: "replace",
        modification: {
          type: "pwdAccountLockedTime",
          values: ["000001010000Z"],
        },
      });

      await new Promise((resolve, reject) => {
        client.modify(userDn, change, (err) => {
          if (err) {
            console.error("Failed to disable user:", err);
            return reject(new Error("Failed to disable user"));
          }
          console.log("User disabled successfully");
          resolve();
        });
      });

      return { ok: true, message: "User disabled successfully" };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
  async enableUser(username) {
    try {
      const client = await ldapAdminModel();
      const userDn = `uid=${username},${process.env.LDAP_BASE_DN}`;
      const change = new ldap.Change({
        operation: "delete",
        modification: {
          type: "pwdAccountLockedTime",
          values: [],
        },
      });
      await new Promise((resolve, reject) => {
        client.modify(userDn, change, (err) => {
          if (err) {
            console.error("Failed to enable user:", err);
            return reject(new Error("Failed to enable user"));
          }
          console.log("User enable successfully");
          resolve();
        });
      });

      return { ok: true, message: "User disabled successfully" };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },
  async checkUserExists(username) {
    try {
      const client = await ldapAdminModel();

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
