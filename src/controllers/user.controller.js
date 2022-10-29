const User = require("../models/user.model")

class Users {
  async createUser (req, res) {
    const user = new User(req.body)
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(200).send({
        user,
        token
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  async getUsers (req, res) {
    try {
      const users = await User.find({})
      res.status(200).send(users)
    }catch (error) {
      res.status(500).send()
    }
  }

  async getCurrentUser (req, res) {
   res.status(200).send(req.user)
  }

  async getUser (req, res) {
    const _id = req.params.id
    try {
      const user = await User.findById(_id)
      if(!user) {
        return res.status(404).send({
          message: 'user not found'
        })
      }
      res.status(200).send(user)
    }catch(error) {
      res.status(500).send()
    }
  }

  async adminUpdateUser (req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdateArray = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdateArray.includes(update))
    if(!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates!' })
    }
    try {
      const user = await User.findById(_id)

      if(!user) {
        return res.status(404).send({
          message: 'user not found',
          status_code: 404,
          success: false
        })
      }

      updates.forEach((update) =>  user[update] = req.body[update])

      await user.save()

      res.status(200).send(user)
    }catch(error) {
      res.status(400).send(error)
    }
  }

  async updateUser (req, res) {
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowedUpdateArray = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdateArray.includes(update))
    if(!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates!' })
    }
    try {
      const user = await User.findById(_id)
      if(!user) {
        return res.status(404).send({
          message: 'user not found',
          status_code: 404,
          success: false
        })
      }

      updates.forEach((update) =>  user[update] = req.body[update])

      await user.save()

      res.status(200).send(user)
    }catch(error) {
      res.status(400).send(error)
    }
  }

  async deleteUser (req, res) {
    try {
      await req.user.remove();
      res.status(200).send(req.user)
    }catch(error) {
      res.status(500).send(error)
    }
  }

  async adminDeleteUser (req, res) {
    const _id = req.params.id
    try {
      const user = await User.findByIdAndDelete(_id)
      if(!user) {
        return res.status(404).send({
          message: 'user not found',
          status_code: 404,
          success: false
        })
      }
      res.status(200).send(user)
    }catch(error) {
      res.status(500).send(error)
    }
  }
}

module.exports = new Users()