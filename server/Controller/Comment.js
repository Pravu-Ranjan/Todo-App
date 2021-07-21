const Comments = require('../Model/Comment')
const Todos = require('../Model/Todo')

exports.create = async (req, res) => {
  try {
    let commentBody = req.body

    const comments = await Comments.create({
      comment: commentBody.comment,
      todoId: commentBody.todoId,
    })

    const todos = await Todos.findByIdAndUpdate(
      { _id: commentBody.todoId },
      { $push: { comments: [comments._id] } },
      { new: true }
    )

    if (comments._id && todos._id) {
      res.status(200).send({ message: 'new comment added!!!' })
    } else {
      throw new Error(`Can't add a comment`)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.findOne = async (req, res) => {
  try {
    let commentId = req.params.commentId

    const comment = await Comments.findById({ _id: commentId })
      .populate('todoId', { _id: 1 })
      .lean()

    if (comment) {
      res
        .status(200)
        .send({ commentData: comment, message: 'got your comment' })
    } else {
      throw new Error(`Can't get the comment`)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    let commentData = req.body
    let commentId = req.params.commentId
    const comment = await Comments.findByIdAndUpdate(
      { _id: commentId },
      commentData
    ).lean()
    if (comment._id) {
      res.status(200).send({ message: 'comment updated' })
    } else {
      throw new Error('cannot update your comment')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    let commentId = req.params.commentId

    const comment = await Comments.findByIdAndDelete({ _id: commentId })
    const todo = await Todos.findById(
      { _id: comment.todoId },
      { _id: 1, comments: 1 }
    ).lean()

    const todoCommentData = todo.comments
    if (todo._id) {
      const index = await todoCommentData.findIndex(
        (data) => data._id.toString() === commentId
      )
      if (index >= 0) {
        todoCommentData.splice(index, 1)
        const todoUpdate = await Todos.findByIdAndUpdate(
          { _id: todo._id },
          {
            $set: {
              comments: [...todoCommentData],
            },
          },
          { new: true }
        )
          .select({ _id: 1 })
          .lean()
        if (todoUpdate._id) {
          res.status(200).send({ message: `Comment Deleted Successfully` })
        } else {
          throw new Error(`Can't delete the comment`)
        }
      } else {
        throw new Error(`Can't find the comment of this todo`)
      }
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
