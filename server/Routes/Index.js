const router = require('express').Router()
const TodoController = require('../Controller/Todo')
const CommentController = require('../Controller/Comment')

//test API's
router.post('/api/todo/create', TodoController.create)
router.get('/api/todo/findAll', TodoController.findAll)
router.get('/api/todo/findOne/:todoId', TodoController.findOne)
router.put('/api/todo/update/:todoId', TodoController.update)
router.delete('/api/todo/delete/:todoId', TodoController.delete)

router.post('/api/todo/comment/create', CommentController.create)
router.get('/api/todo/comment/findOne/:commentId', CommentController.findOne)
router.put('/api/todo/comment/update/:commentId', CommentController.update)
router.delete('/api/todo/comment/delete/:commentId', CommentController.delete)
module.exports = router
