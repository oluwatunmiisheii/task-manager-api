require('dotenv').config();
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user.route')
const taskRouter = require('./routes/task.route')
const authRouter = require('./routes/auth.route')

const app = express()

const port = process.env.PORT || 5500

// app.use((req, res, next) => {
//   console.log(req.body)
//   res.status(503).send('The server is currently under maintenance')
// })

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/users", userRouter)
app.use("/api/", taskRouter)
app.use("/api/", authRouter)


app.listen(port, () => {
  console.log('Server is running on port ' +  port);
})