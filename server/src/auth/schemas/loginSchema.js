module.exports = loginSchema = {
  schema: {
    tags: ["Authentication"],
    summary: "User Login",
    description: "Authenticate user login credentials",
    consumes: ["application/json"],
    produces: ["application/json"],
    body: {
      type: "object",
      properties: {
        username: { type: "string", description: "User's username" },
        password: { type: "string", description: "User's password" },
      },
      required: ["username", "password"],
    },
    response: {
      200: {
        description: "Successful login",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          statusCode: { type: "integer", description: "HTTP status code" },
          token: { type: "string", description: "Authentication token" },
          exists: {
            type: "boolean",
            description: "Indicates if the user exists",
          },
          username: {
            type: "string",
            description: "User's username if exists",
          },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Error message" },
        },
      },
      401: {
        description: "Unauthorized",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          statusCode: { type: "integer", description: "HTTP status code" },
          message: { type: "string", description: "Error message" },
        },
      },
      500: {
        description: "Internal server error",
        type: "object",
        properties: {
          ok: { type: "boolean", description: "Operation status" },
          message: { type: "string", description: "Error message" },
        },
      },
    },
  },
};
