const ProductModel = require("../models/product");
const ProjectModel = require("../../project/models/project");
const UserModel = require("../../users/models/user");

const zentaoServices = require("../../zentao/services/zentao.services");
const projectServices = require("../../users/services/user.services");
const userServices = require("../../users/services/user.services");
const { v4: uuidv4 } = require("uuid");
const productServices = {
  async productExists(name) {
    try {
      const productModel = await ProductModel();
      const product = await productModel.findOne({ name });

      if (product) {
        return { ok: true, exists: true, product };
      }

      return { ok: true, exists: false, message: "product does not exist" };
    } catch (error) {
      console.error("Error checking if product exists:", error);
      return {
        ok: false,
        message: "Error checking if product exists",
        details: error.message,
      };
    }
  },

  async createProduct(product, manager, porfolioZentaoId) {
    try {
      const zentaoResponse = await zentaoServices.createProduct(
        product,
        porfolioZentaoId
      );
      if (!zentaoResponse.ok) {
        console.log(zentaoResponse);
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }
      const productId = uuidv4();
      const productCollection = await ProductModel();
      const productResult = await productCollection.insertOne({
        _id: productId,
        zentaoId: zentaoResponse.data.id,
        active: true,
        ...product,
        creator: manager,
        createdAt: new Date(),
      });
      console.log("product result :", productResult);
      if (productResult.acknowledged) {
        return {
          ok: true,
          message: "product created successfully",
          id: productResult.insertedId,
        };
      } else {
        return { ok: false, message: "MongoDB error" };
      }
    } catch (error) {
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },

  async getProducts(portfolioId = null) {
    try {
      const productModel = await ProductModel();

      const result = await productModel
        .aggregate([
          {
            $match: portfolioId
              ? { active: true, portfolio: portfolioId }
              : { active: true },
          },

          {
            $lookup: {
              from: "projects",
              localField: "_id",
              foreignField: "product",
              as: "projects",
              pipeline: [{ $match: { active: true } }],
            },
          },
          {
            $addFields: {
              projectCount: { $size: "$projects" },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              desc: 1,
              startDate: 1,
              endDate: 1,
              projectCount: 1,
              teamleader: 1,
              portfolio: 1,
              budget: 1,
              description: 1,
              creator: 1,
              zentaoId: 1,
            },
          },
        ])
        .toArray();
      const products = result;
      return { ok: true, products: products };
    } catch (error) {
      console.error("Error getting products:", error);
      return {
        ok: false,
        message: "Error getting products",
        details: error.message,
      };
    }
  },
  async getProductUsers(productId) {
    try {
      let userIds = new Set();
      const projectCollection = await ProjectModel();
      const userCollection = await UserModel();
      const projects = await projectCollection
        .find({ $and: [{ active: true }, { product: productId }] })
        .toArray();

      projects.forEach((project) => {
        project.members.forEach((member) => {
          userIds.add(member);
        });
      });

      const memberPromises = Array.from(userIds).map(async (userId) => {
        return await userCollection.findOne({
          $and: [{ active: true }, { _id: userId }],
        });
      });

      const members = await Promise.all(memberPromises);
      return { ok: true, members: members.filter((member) => member !== null) };
    } catch (error) {
      console.error("Error getting members:", error);
      return {
        ok: false,
        message: "Error getting members",
        details: error.message,
      };
    }
  },
  async deleteProduct(productId) {
    try {
      const productCollection = await ProductModel();
      // Find the portfolio to delete it from Zentao as well
      const product = await productCollection.findOne({ _id: productId });
      if (!product) {
        return { ok: false, message: "product not found" };
      }

      // Delete the portfolio from Zentao
      const zentaoResponse = await zentaoServices.deleteProduct(
        product.zentaoId
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      const deleteResult = await productCollection.updateOne(
        { _id: productId },
        { $set: { active: false } }
      );
      if (deleteResult.modifiedCount === 1) {
        return { ok: true, message: "product deleted successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to delete product",
        };
      }
    } catch (error) {
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },

  async editProduct(productId, productData) {
    try {
      const productCollection = await ProductModel();
      // Find the portfolio to edit it
      const product = await productCollection.findOne({ _id: productId });
      if (!product) {
        return { ok: false, message: "product not found" };
      }

      // Update the portfolio in Zentao if needed
      const zentaoResponse = await zentaoServices.editProduct(
        product.zentaoId,
        productData
      );
      if (!zentaoResponse.ok) {
        return {
          ok: false,
          message: "Zentao error",
          details: zentaoResponse.details,
        };
      }

      // Update the portfolio in the database
      const updateResult = await productCollection.updateOne(
        { _id: productId },
        { $set: productData }
      );
      if (updateResult.modifiedCount === 1) {
        return { ok: true, message: "product edited successfully" };
      } else {
        return {
          ok: false,
          message: "MongoDB error: Failed to edit product",
        };
      }
    } catch (error) {
      console.error("Internal server error:", error);
      return {
        ok: false,
        message: "Internal server error",
        details: error.message,
      };
    }
  },

  async getProductById(productId) {
    try {
      const productModel = await ProductModel();
      const result = await productModel
        .aggregate([
          {
            $match: { active: true, _id: productId },
          },
          {
            $lookup: {
              from: "projects",
              localField: "_id",
              foreignField: "product",
              as: "projects",
              pipeline: [{ $match: { active: true } }],
            },
          },
          {
            $addFields: {
              projectCount: { $size: "$projects" },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              desc: 1,
              startDate: 1,
              endDate: 1,
              projectCount: 1,
              teamleader: 1,
              portfolio: 1,
              budget: 1,
              description: 1,
              creator: 1,
              zentaoId: 1,
            },
          },
        ])
        .toArray();
      console.log(result);
      const product = result[0];
      return { ok: true, product };
    } catch (error) {
      console.error("Error getting product by ID:", error);
      return {
        ok: false,
        message: "Error getting product",
        details: error.message,
      };
    }
  },
};

module.exports = productServices;
