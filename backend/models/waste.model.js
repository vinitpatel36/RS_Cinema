const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wasteSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Waste", wasteSchema);
