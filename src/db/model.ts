import mongoose from "mongoose";
import * as process from "process";

import "@/config";
import { UserSchema } from "./schema";

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

export const UserModel = mongoose.model("user", UserSchema);
