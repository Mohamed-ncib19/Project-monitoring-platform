module.exports = refreshTokenSchema = {
  schema: {
    tags: ["Authentication"],
    summary: "Generate Access Token",
    description: "Generate a new access token using the provided refresh token",
    consumes: ["application/json"],
    produces: ["application/json"],
    body: {
      type: "object",
      properties: {
        refreshToken: { type: "string", description: "The refresh token" },
      },
      required: ["refreshToken"],
    },
    response: {
      201: {
        description: "Access token generated successfully",
        type: "object",
        properties: {
          accessToken: {
            type: "object",
            properties: {
              token: { type: "string", description: "New access token" },
              expiresAt: {
                type: "string",
                format: "date-time",
                description: "Access token expiration time",
              },
            },
          },
        },
      },
      400: {
        description: "Missing refresh token",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
    },
  },
};
