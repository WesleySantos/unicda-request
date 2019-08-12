import React from 'react';
import { Router, Route } from 'react-router-dom'

import { history } from './_helpers'
import { PrivateRoute } from './components/privateRoute'
import Home from './pages/home'
import { Login, Register } from './pages/auth'
import Request from './pages/request'

class App extends React.Component {
  constructor() {
    super()

    if( typeof window !== 'undefined') {
      const UIkit = require('uikit')
      const UIkitIcons = require('uikit/dist/js/uikit-icons')

      UIkit.use(UIkitIcons)
      window.UIkit = UIkit
    }
  }

  render() {
    console.log("object l")
    return (
      <div className="ur-page uk-section-muted">
        <Router history={history}>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/requests/:id" component={Request} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </div>
    );
  }
}

export { App }