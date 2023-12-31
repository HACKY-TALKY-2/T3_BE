import mongoose from "mongoose";
import * as process from "process";

import "@/config.js";
import { UserSchema, ExcuseHistorySchema } from "./schema.js";

export const connectDB = () => {
  mongoose
    .connect(
      process.env.MONGO_CONNECTION_URI ||
        "mongodb://localhost:27017/techforimpact",
    )
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch(err => {
      console.log(err);
    });
};

export const UserModel = mongoose.model("user", UserSchema);
export const ExcuseHistoryModel = mongoose.model(
  "excuseHistory",
  ExcuseHistorySchema,
);
