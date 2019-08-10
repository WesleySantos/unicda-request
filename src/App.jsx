import React from 'react';
import { Router, Route } from 'react-router-dom'

import { history } from './_helpers'
import { PrivateRoute } from './components/privateRoute'
import { StudentHome, OfficerHome } from './pages/home'
import { Login, Register } from './pages/auth'
import Request from './pages/request'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userRoles: JSON.parse(localStorage.getItem('user'))
    }

    if( typeof window !== 'undefined') {
      const UIkit = require('uikit')
      const UIkitIcons = require('uikit/dist/js/uikit-icons')

      UIkit.use(UIkitIcons)
      window.UIkit = UIkit
    }
  }

  // componentDidMount() {
  //   let user = JSON.parse(localStorage.getItem('user'))

  //   if( user ) this.setState({ userRoles: user.creds.user.roles})
  // }

  render() {
    const { userRoles } = this.state

    return (
      <div className="ur-page uk-section-muted">
        {/* {alert.message &&
          <div className={`uk-position-top uk-position-z-index uk-${alert.type}`} data-uk-alert>
            <button className="uk-alert-close" data-uk-close/>
            <p>{alert.message}</p>
          </div>
        } */}
        <Router history={history}>
          { userRoles && userRoles.creds.user.roles.length > 0 ?
            userRoles.creds.user.roles.findIndex( role => role.name === 'STUDENT') !== -1 ?
            <React.Fragment>
              <PrivateRoute exact path="/" component={StudentHome} />
              <PrivateRoute path="/requests/:id" component={Request} />
            </React.Fragment> :
            <PrivateRoute exact path="/" component={OfficerHome} />
            : null
          }
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </div>
    );
  }
}

export { App }