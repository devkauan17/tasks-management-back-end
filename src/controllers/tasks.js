const knex = require("../connections/database");

const listTasks = async (req, res) => {
    const { id } = req.user;
    try {
        const tasks = await knex('tasks').where({ user_id: id });

        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const registerTask = async (req, res) => {
    const { description, completed } = req.body;
    const { id } = req.user;

    try {

        const informedDescription = description.toLowerCase();

        const taskFound = await knex('tasks').where({ description }).first();

        if (taskFound && informedDescription === taskFound.description.toLowerCase()) {
            return res.status(400).json('Essa tarefa já existe.');
        };

        await knex('tasks').insert({ description, completed, user_id: id });

        return res.status(202).json({});

    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const updateTask = async (req, res) => {
    const { description, completed } = req.body;
    const { id } = req.params;

    try {

        const taskFound = await knex('tasks').where({ id }).first();

        if (!taskFound) { return res.status(400).json('Tarefa não encontrada.') };

        await knex('tasks').update({ description, completed }).where({ id });

        return res.status(204).json({});

    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const taskFound = await knex('tasks').where({ id }).first();

        if (!taskFound) { return res.status(400).json('Tarefa não encontrada.') };

        await knex('tasks').where({ id }).del();

        return res.status(200).json({});

    } catch (error) {
        return res.status(500).json(error.message);
    };
};

module.exports = { registerTask, updateTask, listTasks, deleteTask };