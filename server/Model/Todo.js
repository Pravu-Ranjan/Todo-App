const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  comments: {
    type: mongoose.Schema.Types.Array,
    ref: 'comments',
  },
})

const Todos = mongoose.model('todos', TodoSchema)

module.exports = Todos
