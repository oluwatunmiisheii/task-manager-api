const Task = require("../models/task")

class Tasks {
  async createTask (req, res) {
    try {
      const task = new Task(req.body)
      await task.save();
      res.status(201).send(task)
    }catch (error) {
      res.status(400).send(error)
    }
  }

  async getTasks (req, res) {
    try {
      const tasks = await Task.find({})
      res.status(200).send(tasks)
    } catch (error) {
      res.status(500).send()
    }
  }

  async getTask (req, res) {
    const _id = req.params.id
    try {
      const task = await Task.findOne({ _id })
      if(!task) {
        return res.status(404).send()
      }
      res.status(200).send(task)
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 73 ~ app.get ~ error", error)
      res.status(500).send()
    }
  }

  async updateTask (req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdateArray = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdateArray.includes(update))
    if(!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates!' })
    }
    try {
      const task = await Task.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true
      })
      if(!task) {
        return res.status(404).send({
          message: 'Task not found',
          status_code: 404,
          success: false
        })
      }
      res.status(200).send(task)
    }catch(error) {
      res.status(400).send(error)
    }
  }

  async deleteTask (req, res) {
    const _id = req.params.id
    try {
      const task = await Task.findByIdAndDelete(_id)
      if(!task) {
        return res.status(404).send({
          message: 'Task not found',
          status_code: 404,
          success: false
        })
      }
      res.status(200).send(task)
    }catch(error) {
      console.log("🚀 ~ file: index.js ~ line 160 ~ app.delete ~ error", error)
      res.status(500).send(error)
    }
  }
}

module.exports = new Tasks()