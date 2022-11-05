const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a  positive number')
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, 'Password must have a minimum of 6 characters'],
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})


// Hash plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '7 days'})

  user.tokens = [...user.tokens, { token }]
  await user.save()
  return token
}

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject();

  delete userObject.password
  delete userObject.tokens

  return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
 const user = await User.findOne({ email })
  if(!user) {
    throw new Error("Unable to login")
  }

  const isMatch = bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error("Unable to login")
  }

  return user
}

const User = mongoose.model('User', userSchema)


module.exports = User