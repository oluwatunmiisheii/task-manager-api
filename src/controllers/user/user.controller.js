const User = require("../../models/user.model")

class Users {
  async createUser (req, res) {
    const user = new User(req.body)
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({
        data: {
          user,
          token
        },
        message: 'User created successfully',
        success: true
      })
    } catch (error) {
      res.status(400).send({
        message: 'User not created',
        success: false,
        error
      })
    }
  }

  async getUsers (req, res) {
    try {
      const users = await User.find({})
      res.status(200).send({
        data: users,
        message: 'Users fetched successfully',
        success: true
      })
    }catch (error) {
      res.status(500).send({
        message: 'Users not fetched',
        success: false,
        error
      })
    }
  }

  async getCurrentUser (req, res) {
    res.status(200).send({
      data: req.user,
      message: 'User fetched successfully',
      success: true
   })
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
      res.status(200).send({
        data: user,
        message: 'User fetched successfully',
        success: true
      })
    }catch(error) {
      res.status(500).send({
        message: 'User not fetched',
        success: false,
        error
      })
    }
  }

  async updateUser (req, res) {
    const _id = req.user._id
    const userToUpdateId = request.params.id
    
    if(_id !== userToUpdateId) {
      return res.status(403).send({
        message: 'You are not authorized to update this user',
        status_code: 401,
        success: false
      })
    }

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
      res.status(200).send({
        message: 'User deleted successfully',
        success: true
      })
    }catch(error) {
      res.status(500).send({
        message: 'User not deleted',
        success: false,
        error
      })
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
}

module.exports = new Users()