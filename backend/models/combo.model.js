const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comboSchema = new Schema(
    {
        product: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        Price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, strict: false }
);

module.exports = mongoose.model("Combo", comboSchema);
