const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Vendor", vendorSchema);
