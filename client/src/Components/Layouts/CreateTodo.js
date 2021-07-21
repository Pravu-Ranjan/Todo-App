import React, { useState, Fragment } from 'react'
import { Todo } from '../../Recoil-State/Atom'
import { useRecoilState } from 'recoil'
import axios from 'axios'

function CreateTodo() {
  const [todo, setTodo] = useRecoilState(Todo)
  console.log(todo)
  const [todoState, setTodoState] = useState({
    name: '',
    description: '',
    status: '',
  })

  const handleOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const status = true

    setTodoState((prevState) => ({
      ...prevState,
      [name]: value,
      status: status,
    }))
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}/create`,
        todoState
      )
      if (response.data.message) {
        setTodo(todoState)
        setTodoState({
          name: '',
          description: '',
          status: '',
        })
      } else {
        throw new Error('Cant post the api')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row mt-0 justify-content-center">
          <div className="col-4">
            <form onSubmit={(event) => handleOnSubmit(event)}>
              <div className="mb-3">
                <label for="todo-name" className="form-label text-bold">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todo-name"
                  placeholder="your todo name"
                  name="name"
                  value={todoState.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label for="todo-description" className="form-label">
                  description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todo-description"
                  placeholder="write your description"
                  name="description"
                  value={todoState.description}
                  onChange={handleOnChange}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row mt-0 justify-content-center">
          <div className="col-6"></div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateTodo
