import mongoose from "mongoose";
const { Schema } = mongoose;

export const BillModel = mongoose.model('Bet', new Schema({
  details: { type: Object, required: true },
  better: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  value: { type: String, required: true },
  winner: { type: Boolean, default: false },
  dateBet: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}))
