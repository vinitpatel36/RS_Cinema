
const productModel = require("../models/product.model");
const { productValidator } = require("../validators/userValidator");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().select("-updatedAt -createdAt -__v");
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.getProduct = async (req, res) => {
    const { _id } = req.body;
    try {
        const product = await productModel.findById(_id).select("-updatedAt -createdAt -__v");
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.updateProducts = async (req, res) => {
    const productData = req.body;

    const { error } = productValidator.validate(productData);
    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    try {
        if (productData._id == "") {
            delete productData._id;
            const newProduct = new productModel(productData);
            await newProduct.save();
            if (!newProduct) {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });
            }
            res.status(200).json({ success: true, message: "product successfully added", product: newProduct });

        } else {
            const product = await productModel
                .findByIdAndUpdate(
                    productData._id,
                    productData,
                    {
                        new: true,
                        upsert: true
                    });

            if (!product) {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });
            }
            res.status(200).json({ success: true, message: "product successfully updated", product: product });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.removeProduct = async (req, res) => {
    const { _id } = req.body;
    try {
        const profile = await productModel.findByIdAndDelete(_id);
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "product not found." });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}