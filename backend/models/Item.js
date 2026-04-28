const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an item name"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the quantity"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please provide the price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock"],
      default: "Available",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Item", itemSchema);
