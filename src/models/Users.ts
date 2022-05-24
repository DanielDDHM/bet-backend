import mongoose from "mongoose";
const { Schema } = mongoose;
import UserInterface from "../types/User";

export const UserModel = mongoose.model('User', new Schema<UserInterface>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
  },
  contact: { type: Object, required: false },
  password: { type: String, required: true, unique: true },
  bets: [{
    type: Schema.Types.ObjectId,
    ref: "Bet"
  }],
  photo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  isConfirmed: { type: Boolean, required: false, default: false },
  isStaff: { type: Boolean, required: false, default: false },
}))
