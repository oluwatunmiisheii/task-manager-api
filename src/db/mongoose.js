const mongoose = require('mongoose')
const connectionUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/task-manager-api"
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
