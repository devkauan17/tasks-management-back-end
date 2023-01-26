const joi = require('joi');

const currentPasswordSchema = joi.string().min(6).trim().required().messages({
    "any.required": "Senha atual obrigatória.",
    "string.empty": "Senha atual obrigatória.",
    "string.min": "A sua senha atual precisa ter no mínimo 6 caracteres."
})

const newPasswordSchema = joi.string().min(6).messages({
    "string.min": "A sua senha atual precisa ter no mínimo 6 caracteres."
})


const emailSchema = joi.string().trim().email().messages({
    "string.email": "Email no formato inválido.",
})


module.exports = { newPasswordSchema, currentPasswordSchema, emailSchema };