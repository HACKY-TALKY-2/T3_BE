import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error("NODE_ENV not specified");
}

// loads environment variables from .env.<NODE_ENV> file in project root folder
const envFile = path.join(
  path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../"),
  `.env.${NODE_ENV}`,
);

if (fs.existsSync(envFile)) {
  dotenv.config({
    path: envFile,
  });
}
