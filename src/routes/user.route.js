const express = require('express')
const userController = require("../controllers/user.controller")
const userRouter = new express.Router()
const authMiddleware = require("../middleware/auth")

userRouter.post('/users',  userController.createUser)
userRouter.get('/users', authMiddleware, userController.getUsers)
userRouter.get('/users/me', authMiddleware, userController.getCurrentUser)
userRouter.get('/users/:id', authMiddleware, userController.getUser)
userRouter.patch('/admin/users/:id', authMiddleware, userController.adminUpdateUser)
userRouter.patch('/users/me', authMiddleware, userController.updateUser)
userRouter.patch('/users/:id', authMiddleware, userController.updateUser)
userRouter.delete('/admin/users/:id', authMiddleware, userController.adminDeleteUser)
userRouter.delete('/users/me', authMiddleware, userController.adminDeleteUser)


module.exports = userRouter