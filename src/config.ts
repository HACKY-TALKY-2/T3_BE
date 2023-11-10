import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error("NODE_ENV not specified");
}

// loads environment variables from .env.<NODE_ENV> file in project root folder
const envFile = path.join(path.resolve(__dirname, "../"), `.env.${NODE_ENV}`);

if (fs.existsSync(envFile)) {
  dotenv.config({
    path: envFile,
  });
}
