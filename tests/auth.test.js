const request = require('supertest')
const app = require('../src/app')
const User = require("../src/models/user.model")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "oluwatunmiseadenuga95@gmail.com",
  password: "123456789",
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})


afterAll(async () => {
  await mongoose.connection.close()
})


describe("User", () => {
  test("should signup a new user", async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: "Test",
      email: "test@example.com",
      password: "1234567890"
    }).expect(201)

    const user = await User.findById(response.body.data.user._id)
    
    expect(response.body).toMatchObject({
      data: {
        user: {
          name: "Test",
          email: "test@example.com",
          age: 0
        },
        token: user.tokens[0].token
      }
    })
  })

  test("should not save plain password", async () => {
    const user = await User.findOne({_id: userOneId})
    expect(user.password).not.toBe("123456789")
  })
  
  test("should login existing user", async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: userOne.email,
      password: userOne.password
    }).expect(200)
    
    const user = await User.findById(userOne._id)

    expect(response.body.data.token).toBe(user.tokens[1].token)
  })
  
  test("should not login nonexistent user", async () => {
    await request(app).post('/api/auth/login').send({
      email: "ooooooo@email.com",
      password: "thisisnotmypass"
    }).expect({
      "message": "Unable to login",
      "success": false
    })
  })
  
  test("should get profile for user", async () => {
    await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
  })
  
  test("should not get profile for unauthenticated user", async () => {
    await request(app)
      .get('/api/users/me')
      .send()
      .expect(401)
  })

  test("should delete account for user", async () => {
    await request(app)
      .delete('/api/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)

    const user = await User.findById(userOne.id)
    expect(user).toBeNull()
  })

  test("should not delete account for unauthenticated user", async () => {
    await request(app)
      .delete('/api/users/me')
      .send()
      .expect(401)
  })
})
