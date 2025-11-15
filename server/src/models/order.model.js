const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  foodItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
      required: true,
    },
  ],
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "Card"],
    default: "COD",
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;