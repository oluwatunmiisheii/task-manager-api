const express = require('express')
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middleware/auth")
const authRouter = new express.Router()

authRouter.post('/auth/login', authController.login)
authRouter.post('/auth/logout', authMiddleware, authController.logout)
authRouter.post('/auth/logoutAll', authMiddleware, authController.logoutAll)
authRouter.post('/auth/register', userController.createUser)

module.exports = authRouter