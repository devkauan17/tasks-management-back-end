const knex = require("../connections/database");

const listTasks = async (req, res) => {
    const { id } = req.user;
    try {
        const tasks = await knex('tasks').where({ user_id: id });

        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json('Erro interno do servidor.')

    };
};

const registerTask = async (req, res) => {
    const { description, completed } = req.body;
    const { id } = req.user;

    try {

        const task = await knex('tasks').insert({ description, completed, user_id: id }).returning('*');

        return res.status(202).json(task);

    } catch (error) {
        return res.status(500).json(error.message)

    };
};

const updateTask = async (req, res) => {
    const { description, completed } = req.body;
    const { id } = req.params;
    const { user } = req

    try {

        await knex('tasks').update({ description, completed }).where({ id });

        return res.status(204).json({});

    } catch (error) {
        return res.status(500).json('Erro interno do servidor.')

    };
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    try {
        const task = await knex('tasks').where({ id, user_id: user.id }).first();

        if (!task) { return res.status(400).json('Tarefa não encontrada.') };

        await knex('tasks').where({ id }).del();

        return res.status(200).json({});

    } catch (error) {
        return res.status(500).json('Erro interno do servidor.')

    };
};

module.exports = { registerTask, updateTask, listTasks, deleteTask };