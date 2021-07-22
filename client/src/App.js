import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './Components/Pages/Home'
import todo from './Components/Pages/Todo'
import AppBar from './Components/Layouts/Navbar'
import './App.css'
function App() {
  return (
    <Fragment>
      <AppBar />
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/todo" exact component={todo} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
