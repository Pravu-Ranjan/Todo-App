import React, { Fragment, useState } from 'react'
import { fetchTodos, Todo, Comment } from '../../Recoil-State/Atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

var updateTodoURL = process.env.REACT_APP_API_PATH + '/update'
var addCommentURL = process.env.REACT_APP_API_PATH + '/comment/create'

function TodoList() {
  const allTodos = useRecoilValue(fetchTodos)
  const [todo, setTodo] = useRecoilState(Todo)
  const [comment, setComment] = useRecoilState(Comment)
  const [comments, setComments] = useState({ key: '', value: '' })
  console.log(comments)

  const TodoArray = allTodos ? allTodos.todos : []
  let progressList = []
  let completedList = []

  TodoArray.map((data) => {
    if (data.status === true) {
      return progressList.push(data)
    } else {
      return completedList.push(data)
    }
  })

  const handleUpdateTodo = async (data, event) => {
    event.preventDefault()

    try {
      let currentState = {
        name: data.name,
        description: data.description,
        status: !data.status,
      }
      const response = await axios.put(
        `${updateTodoURL}/${data._id}`,
        currentState
      )
      if (response.data.message) {
        setTodo(currentState)
      } else {
        throw new Error('Cant post the api')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleOnChangeComment = (key, event) => {
    event.preventDefault()
    const value = event.target.value
    setComments({
      key: key,
      value: value,
    })
  }

  const handleOnSubmit = async (key, data, event) => {
    event.preventDefault()

    console.log(comments)

    try {
      let commentBody = {
        comment: comments,
        todoId: data._id,
      }
      const response = await axios.post(addCommentURL, commentBody)

      if (response.data.message) {
        setComment(commentBody)
        setComments('')
      } else {
        throw new Error(`Can't post the api`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const todoProgressList = () =>
    progressList &&
    progressList.map((data, key) => (
      <tr key={key}>
        <td>
          <div className="container containerList">
            <div className="row d-flex">
              <div className="col-6">
                <h5>{data.name}</h5>
                <p>{data.description}</p>
              </div>
              <div className="col-6">
                <button
                  name="done"
                  value="true"
                  className="btn btn-link updateButton"
                  onClick={(event) => handleUpdateTodo(data, event)}
                >
                  Mark it as done
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form
                  class="commentForm"
                  onSubmit={(event) => handleOnSubmit(key, data, event)}
                >
                  <div className="container-fluid comment-container">
                    <div className="row">
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control todo-comment"
                          placeholder="your comment"
                          name="comment"
                          value={comments.value}
                          onChange={(event) =>
                            handleOnChangeComment(key, event)
                          }
                        />
                      </div>
                      <div className="col-4">
                        <button
                          type="submit"
                          class="comment-btn comment-btn--primary uppercase"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <table className="table mt-5">
                  <thead className="text-left">
                    <h5>Comments</h5>
                  </thead>
                  <tbody>
                    {data.comments.map((cmtData, key) => (
                      <tr key={key}>
                        <td className="comment-table">
                          <p>{cmtData.comment}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </td>
      </tr>
    ))
  const todoCompletedList = () =>
    completedList &&
    completedList.map((data, key) => (
      <tr key={key}>
        <td>
          <div className="container containerList">
            <div className="row d-flex">
              <div className="col-6">
                <h5>{data.name}</h5>
                <p>{data.description}</p>
              </div>
              <div className="col-6">
                <button
                  name="notDone"
                  value="true"
                  className="btn btn-link updateButton"
                  onClick={(event) => handleUpdateTodo(data, event)}
                >
                  Mark it as not done
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    ))

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row mt-0 justify-content-center d-flex">
          <div className="col-6">
            <table className="table">
              <thead className="text-center">
                <h1>Progress</h1>
              </thead>
              <tbody>{todoProgressList()}</tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table">
              <thead className="text-center">
                <h1>Completed</h1>
              </thead>
              <tbody>{todoCompletedList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TodoList
