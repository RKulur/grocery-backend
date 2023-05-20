const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  ShippingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipping",
  },
  cart: {
    type: Array,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "On stock",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shipping", OrderSchema);
