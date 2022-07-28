import { PORT } from "../config";
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node CHallenge Disney API",
      version: "1.0.0",
      description: "Node CHallenge Disney API for Alkemy",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
