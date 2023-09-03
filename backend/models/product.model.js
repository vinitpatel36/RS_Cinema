const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salesRate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    threshold: {
      type: Number,
      required: true,
    },
    rawItem: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Product", productSchema);