const mongoose = require("mongoose");
const { ROLES } = require("../utils/constants");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("User", userSchema);
