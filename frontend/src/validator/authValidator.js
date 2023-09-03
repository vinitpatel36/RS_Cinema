import joi from "joi";


export const  userLoginValidator = joi.object({
    mobile: joi.string().length(10).required(),
    password: joi.string().required(),
})

export const  passwordValidator = joi.object({ password: joi.string().min(6).required() })

export const  tokenValidator = joi.object({
    token: joi.string().length(64).required()
})

export const productValidator = joi.object({
    _id: joi.string().min(0),
    name: joi.string().required(),
    salesRate: joi.string().required(),
    description: joi.string().required(),
    unit: joi.string().required(),
    quantity: joi.number().required(),
    threshold: joi.number().required(),
    rawItem: joi.boolean().required(),
});