const swaggerDescription = {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "My API",
      description: "API documentation",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost:" + (process.env.PORT || 3000),
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
};

const swaggerUiDescription = {
  routePrefix: "/documentation",
  swaggerUrl: "/documentation/json",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  staticCSPSettings: {
    "script-src": "'self'",
    "style-src": "'self'",
    "img-src": "'self'",
    "font-src": "'self'",
    "connect-src": "'self'",
    "object-src": "'self'",
    "media-src": "'self'",
    "frame-src": "'self'",
  },
  exposeRoute: true,
};

module.exports = {
  swaggerDescription,
  swaggerUiDescription,
};
