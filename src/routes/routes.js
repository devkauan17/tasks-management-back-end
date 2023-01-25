const express = require('express');
const routes = express();
const userSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
const taskSchema = require('../schemas/taskSchema')
const authentication = require('../middlewares/authentication')
const validateRequest = require('../middlewares/validateRequest');

const { registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser } = require('../controllers/users');
const { listTasks,
    registerTask,
    updateTask,
    deleteTask } = require('../controllers/tasks');
const updateSchema = require('../schemas/updateSchema');

routes.post('/login', validateRequest(loginSchema), loginUser);
routes.post('/user', validateRequest(userSchema), registerUser);

routes.use(authentication)

routes.get('/user', getUser);
routes.delete('/user', deleteUser);
routes.put('/user', validateRequest(updateSchema), updateUser);

routes.get('/tasks', listTasks);
routes.post('/task', validateRequest(taskSchema), registerTask);
routes.put('/task/:id', validateRequest(taskSchema), updateTask);
routes.delete('/task/:id', deleteTask)

module.exports = routes;