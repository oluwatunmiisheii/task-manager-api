const express = require('express')
const taskController = require("../controllers/task/task.controller")
const taskRouter = new express.Router();
const authMiddleware = require("../middleware/auth")

taskRouter.get('/tasks', authMiddleware, taskController.getTasks)
taskRouter.get('/tasks/:id', authMiddleware, taskController.getTask)
taskRouter.post('/tasks', authMiddleware, taskController.createTask)
taskRouter.patch('/tasks/:id', authMiddleware, taskController.updateTask)
taskRouter.delete('/tasks/:id', authMiddleware, taskController.deleteTask)


module.exports = taskRouter