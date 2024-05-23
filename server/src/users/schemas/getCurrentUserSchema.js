module.exports = getCurrentUserSchema = {
  tags: ["Users"],
  summary: "Get Current User",
  description: "Retrieve the current authenticated user's information",
  response: {
    200: {
      description: "Successful retrieval of user data",
      type: "object",
      properties: {
        error: { type: "null", description: "Error message" },
        data: {
          type: "object",
          description: "User information",
          properties: {
            _id: { type: "string", description: "User ID" },
            username: { type: "string", description: "Username" },
            firstname: { type: "string", description: "First name" },
            lastname: { type: "string", description: "Last name" },
            bio: { type: "string", description: "User bio" },
            phone: { type: "number", description: "Phone number" },
            email: { type: "string", description: "Email address" },
            status: { type: "string", description: "User status" },
            role: { type: "string", description: "User role" },
            joinedAt: {
              type: "string",
              format: "date-time",
              description: "Joining date",
            },
          },
        },
      },
    },
    404: {
      description: "User not found",
      type: "object",
      properties: {
        error: {
          type: "object",
          properties: {
            message: { type: "string", description: "Error message" },
          },
        },
        data: { type: "null", description: "Response data" },
      },
    },
    500: {
      description: "Internal server error",
      type: "object",
      properties: {
        error: {
          type: "object",
          properties: {
            message: { type: "string", description: "Error message" },
            details: { type: "string", description: "Error details" },
          },
        },
        data: { type: "null", description: "Response data" },
      },
    },
  },
};
