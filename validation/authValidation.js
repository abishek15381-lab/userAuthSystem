import Joi from "joi";

export const signupvalidation = Joi.object({
    name:Joi.string().min(3).max(50).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
});

export const loginvalidation = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
});

export const forgotPasswordValidation = Joi.object({
    email:Joi.string().email().required(),
});

export const resetPasswordValidation = Joi.object({
    password:Joi.string().min(6).required(),
});