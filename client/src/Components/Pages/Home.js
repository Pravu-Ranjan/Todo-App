import React, { Fragment, Suspense } from 'react'
import CreateTodo from '../Layouts/CreateTodo'
import TodoList from '../Layouts/TodoList'
function Home() {
  return (
    <Fragment>
      <CreateTodo />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-5">
            <Suspense fallback={<span>Loading...</span>}>
              <TodoList />
            </Suspense>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home
