const knex = require("../connections/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userEmail = await knex('users').where({ email }).first();

        if (userEmail) { return res.status(400).json('Email já cadastrado.') };

        const encryptedPassword = await bcrypt.hash(password, 10);

        await knex('users').insert({ name, email, password: encryptedPassword });

        return res.status(202).json({})

    } catch (error) {
        return res.status(500).json('Erro interno do servidor.')

    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await knex('users').where({ email }).first();

        if (!user) { return res.status(400).json('Email ou senha inválida.') }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) { return res.status(400).json('Email ou senha inválida.') };

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "7d" });

        const { password: _, ...userData } = user

        return res.status(200).json({ user: userData, token })

    } catch (error) {
        return res.status(500).json('Erro interno do servidor.')
    }
}

const updateUser = async (req, res) => {
    const { name, email, currentPassword, newPassword } = req.body;
    const { user } = req
    const updateData = {};

    try {

        if (email) {
            const userEmail = await knex('users').where({ email }).first();

            if (userEmail && userEmail.email !== user.email) { return res.status(400).json('Email já cadastrado.') };

            updateData.email = email;
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password);

        if (!validPassword) {
            return res.status(400).json('Senha incorreta.');
        };

        if (name) { updateData.name = name; };

        if (newPassword) {

            const encryptedPassword = await bcrypt.hash(newPassword, 10);

            updateData.password = encryptedPassword;

        };

        console.log(updateData)

        await knex('users').update(updateData).where({ id: user.id });

        return res.status(201).json();

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.user;

    try {
        await knex('users').where({ id }).del()

        return res.status(200).json({});

    } catch (error) {
        return res.status(500).json('Erro interno do servidor.')
    }
}

const getUser = async (req, res) => {

    return res.status(200).json(req.user)
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUser }