const express = require('express')
const userController = require("../controllers/user/user.controller")
const userRouter = new express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const schema = require("../validations")
const validatorMiddleware = require("../middleware/validator.middleware")

userRouter.post('/', [authMiddleware, validatorMiddleware(schema.register, 'body')],  userController.createUser)
userRouter.get('/me', authMiddleware, userController.getCurrentUser)
userRouter.delete('/me', authMiddleware, userController.deleteUser)
userRouter.get('/:id', [authMiddleware, validatorMiddleware(schema.getUser, 'params')], userController.getUser)
userRouter.patch('/:id', authMiddleware, userController.updateUser)
userRouter.get('/', authMiddleware, userController.getUsers)


module.exports = userRouter