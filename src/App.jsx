import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './components/privateRoute';
import Home from './pages/home';
import { Login, Register } from './pages/auth';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAlerts();
    });

    if( typeof window !== 'undefined') {
      const UIkit = require('uikit')
      const UIkitIcons = require('uikit/dist/js/uikit-icons')

      UIkit.use(UIkitIcons)
      window.UIkit = UIkit
    }
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="ur-page uk-section-muted">
        {alert.message &&
          <div className={`uk-position-top uk-position-z-index uk-${alert.type}`} data-uk-alert>
            <button className="uk-alert-close" data-uk-close/>
            <p>{alert.message}</p>
          </div>
        }
        <Router history={history}>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </div>
    );
  }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };