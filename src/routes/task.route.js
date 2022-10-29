const express = require('express')
const taskController = require("../controllers/task.controller")
const taskRouter = new express.Router()

taskRouter.get('/tasks', taskController.getTasks)
taskRouter.get('/tasks/:id', taskController.getTask)
taskRouter.post('/tasks', taskController.createTask)
taskRouter.patch('/tasks/:id', taskController.updateTask)
taskRouter.delete('/tasks/:id', taskController.deleteTask)


module.exports = taskRouter