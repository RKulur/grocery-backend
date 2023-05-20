const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShippingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  groceryId: {
    type: Array,
    required: true,
  },
  cartId: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shipping", ShippingSchema);
