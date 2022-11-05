const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user.route')
const taskRouter = require('./routes/task.route')
const authRouter = require('./routes/auth.route')
const dotenv = require('dotenv');

const app = express()
dotenv.config();

const port = process.env.PORT || 4500


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