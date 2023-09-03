const Joi = require('joi')



exports.userSignupValidator = Joi.object({
    mobile: Joi.string().length(10).required(),
    password: Joi.string().min(6).required(),
})

exports.resetPassValidator = Joi.object({
    token: Joi.string().length(64).required(),
    password: Joi.string().min(6).required()
})

exports.passwordValidator = Joi.object({ password: Joi.string().min(6).required() })

exports.emailValidator = Joi.object({ mobile: Joi.string().email().required() })

exports.tokenValidator = Joi.object({
    token: Joi.string().length(64).required()
})

// useFull

exports.userLoginValidator = Joi.object({
    mobile: Joi.string().length(10).required(),
    password: Joi.string().required(),
})
exports.userValidator = Joi.object({
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
});
exports.productValidator = Joi.object({
    name: Joi.string().required(),
    salesRate: Joi.string().required(),
    description: Joi.string().required(),
    unit: Joi.string().required(),
    quantity: Joi.number().required(),
    threshold: Joi.number().required(),
    rawItem: Joi.boolean().required(),
});