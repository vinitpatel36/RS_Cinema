const Joi = require("joi");
const { ROLES } = require("../utils/constants");

exports.userValidator = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6)
})
exports.EditUserVerificationValidator = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6)
})
exports.useAccountRoleValidator = Joi.object({
    _id: Joi.string().required(),
    role: Joi.string().valid(...Object.values(ROLES)).required()
})
exports.userIdObjectValidator = Joi.object({
  _id:  Joi.string().length(24).messages({ messages: "valid userId required" }),
})



// useFull
exports.wasteValidator = Joi.object({
    product: Joi.string().required(), // Assuming product is a string here
    quantity: Joi.number().required(),
    date: Joi.date().required(),
});

exports.productValidator = Joi.object({
    _id:Joi.string().min(0),
    name: Joi.string().required(),
    salesRate: Joi.string().required(),
    description: Joi.string().required(),
    unit: Joi.string().required(),
    quantity: Joi.number().required(),
    threshold: Joi.number().required(),
    rawItem: Joi.boolean().required(),
});