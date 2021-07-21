const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todos',
  },
})

const Comments = mongoose.model('comments', CommentSchema)

module.exports = Comments
