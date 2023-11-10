import swaggerJsdoc from "swagger-jsdoc";
import excuseDocs from "./excuse.js";

import "@/config.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Excuse Generator API",
      version: "0.0.1",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `${process.env.HOST || "http://localhost:8000"}`,
      },
    ],
    tags: [
      {
        name: "excuse",
        description: "변명 생성 API",
      },
      {
        name: "auth",
        description: "로그인/로그아웃 API, 이후 개발 예정",
      },
      {
        name: "user",
        description: "사용자 정보 API, 이후 개발 예정",
      },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
      ...excuseDocs,
    },
  },
  apis: ["../routes/excuse.js"],
};

const swaggerDocs = swaggerJsdoc(options);

export default swaggerDocs;
