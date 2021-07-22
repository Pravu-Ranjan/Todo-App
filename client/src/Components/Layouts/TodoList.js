import React, { Fragment } from 'react'
import { fetchTodos, Todo } from '../../Recoil-State/Atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import CreateComment from './CreateComment'

var updateTodoURL = process.env.REACT_APP_API_PATH + '/update'

function TodoList() {
  const allTodos = useRecoilValue(fetchTodos)
  const [todo, setTodo] = useRecoilState(Todo)

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
            <CreateComment index={key} todoId={data._id} />
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
