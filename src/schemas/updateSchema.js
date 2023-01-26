const joi = require('joi');

const updateSchema = joi.object({

    name: joi.string().trim().messages({
        "string.empty": "Nome obrigatório.",
    }),

    email: joi.string().trim().email().messages({
        "string.empty": "Email obrigatório.",
        "string.email": "Email no formato inválido.",
    }),

    currentPassword: joi.string().min(6).trim().required().messages({
        "any.required": "Senha atual obrigatória.",
        "string.empty": "Senha atual obrigatória.",
        "string.min": "A sua senha atual precisa ter no mínimo 6 caracteres."
    }),

    newPassword: joi.string().min(6).trim().messages({
        "any.required": "Senha obrigatória.",
        "string.empty": "Senha obrigatória.",
        "string.min": "A senha precisa ter no mínimo 6 caracteres."
    })

});

module.exports = updateSchema;