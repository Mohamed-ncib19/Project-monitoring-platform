const loginSchema = {
  schema: {
    tags: ["Authentication"],
    summary: "Login user",
    description: "Authenticate a user and return a token",
    consumes: ["application/json"],
    produces: ["application/json"],
    body: {
      type: "object",
      properties: {
        email: { type: "string", description: "User email" },
        password: { type: "string", description: "User password" },
      },
      required: ["email", "password"],
    },
    response: {
      200: {
        description: "Successful authentication",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Operation message" },
          token: { type: "string", description: "Authentication token" },
          newUser: {
            type: "boolean",
            description: "User is already registred in the database",
          },
        },
      },
      400: {
        description: "Missing email or password",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Operation message" },
        },
      },
      403: {
        description: "Invalid credentials",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Operation message" },
        },
      },
      500: {
        description: "Internal server error",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Operation message" },
        },
      },
    },
  },
};

module.exports = loginSchema;
