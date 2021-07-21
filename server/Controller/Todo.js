const Todos = require('../Model/Todo')

exports.create = async (req, res) => {
  try {
    let name = req.body.name
    let description = req.body.description
    let status = req.body.status

    const todo = await Todos.create({
      name: name,
      description: description,
      status: status,
    })
    if (todo) {
      res.status(200).send({ message: 'new todo added!!!' })
    } else {
      throw new Error(`Can't create a todo`)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.findAll = async (req, res) => {
  try {
    const todos = await Todos.find().populate('comments').lean()
    if (todos) {
      res.status(200).send({ message: 'here are the todos', todos: todos })
    } else {
      throw new Error('Cant get the data')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.findOne = async (req, res) => {
  try {
    let todoId = req.params.todoId
    const todo = await Todos.findById({ _id: todoId })
      .populate('comments')
      .lean()
    if (!todo) {
      res.status(200).send({ message: 'here is the todos', todo: todo })
    } else {
      throw new Error('Cant get the data')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    let todoData = req.body
    let todoId = req.params.todoId
    const todo = await Todos.findByIdAndUpdate({ _id: todoId }, todoData)
      .select({ _id: 1 })
      .lean()
    if (todo._id) {
      res.status(200).send({ message: 'todo updated' })
    } else {
      throw new Error('cannot update your todo')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    let todoId = req.params.todoId
    const todo = await Todos.findByIdAndDelete({ _id: todoId }).lean()
    if (!todo) {
      res.status(200).send({ message: 'todo deleted' })
    } else {
      throw new error(`can't delete the todo`)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
