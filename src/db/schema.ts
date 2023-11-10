import { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: { type: String, required: true },
});

export const ExcuseHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  prompt: { type: String, required: true },
  excuse: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});
