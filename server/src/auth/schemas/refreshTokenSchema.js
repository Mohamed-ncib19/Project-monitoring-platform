module.exports = refreshTokenSchema = {
  schema: {
    description: "Refresh access token",
    tags: ["Authentication"],
    body: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: { type: "string", description: "The refresh token" },
      },
    },
    response: {
      201: {
        description: "Successful Token Generation",
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
                description: "The new access token",
              },
            },
          },
          error: { type: "null" },
        },
      },
      400: {
        description: "Bad Request",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
          data: { type: "null" },
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
          data: { type: "null" },
        },
      },
    },
  },
};
