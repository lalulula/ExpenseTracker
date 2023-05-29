const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const TransactionSchema = new Schema(
  {
    user: { type: ObjectId, required: true },
    category_id: { type: ObjectId, required: true },
    details: String,
    amount: Number,
    date: { type: Date, default: new Date() },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
