const User = require("../models/user.model")

class Auth {
  async login (req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.status(200).send({
        user,
        token
      })
    } catch (error) {
      res.status(400).send()
    }
  }
  async logout (req, res) {
    try {
     req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
     await req.user.save();
     res.status(200).send({
        successful: true
     })
    } catch (error) {
      res.status(500).send()
    }
  }
  async logoutAll (req, res) {
    try {
      req.user.tokens = []
      await req.user.save();

      res.status(200).send({
        successful: true
      })
    } catch (error) {
      res.status(500).send()
    }
  }
}

module.exports = new Auth()