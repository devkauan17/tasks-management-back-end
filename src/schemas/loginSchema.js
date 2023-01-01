const joi = require('joi')

const loginSchema = joi.object({

    email: joi.string().trim().required().email().messages({
        "any.required": "Email obrigatório.",
        "string.empty": "Email obrigatório.",
        "string.email": "Email no formato inválido.",
    }),

    password: joi.string().min(6).trim().required().messages({
        "any.required": "Senha obrigatória.",
        "string.empty": "Senha obrigatória.",
        "string.min": "A senha precisa ter no mínimo 6 caracteres."
    })
})

module.exports = loginSchema;