import React from "react";
import { Link } from "react-router-dom"

const logo = require('../assets/img/logo.svg')

class Dash extends React.Component {
  state = {
    creds: {}
  }

  componentDidMount() {
    this.setState({ creds: JSON.parse(localStorage.getItem('user')).creds })
  }
  render() {
    const { creds } = this.state;
    const { children } = this.props;

    return (
      <React.Fragment>
        <div className="ur-header uk-visible@m uk-section-default">
          <div>
            <div className="uk-navbar-container uk-navbar-transparent">
              <div className="uk-container uk-container-expand">
                <nav data-uk-navbar="mode: click">
                  <div className="uk-navbar-left">
                    <Link to="/" className="uk-navbar-item uk-logo"><img src={logo} alt="" uk-svg="true"/></Link>
                  </div>
                  <div className="uk-navbar-center">
                    <ul className="uk-navbar-nav">
                      <li><Link to="/">Home</Link></li>
                      {/* <li><Link to="/requests">Requests</Link></li> */}
                      <li><Link to="/history">Record</Link></li>
                      {/* <li><Link to="/messages">Messages</Link></li> */}
                    </ul>
                  </div>
                  <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav uk-navbar-item">
                      <li>
                        <a href="#">
                          <div className="ur-notification">
                            <span className="uk-button uk-position-relative uk-padding-small uk-padding-remove-vertical" href="#" data-uk-icon="icon: bell">
                              <span className="uk-badge uk-position-absolute uk-position-z-index"></span>
                            </span>
                          </div>
                        </a>

                        <div className="uk-navbar-dropdown" style={{width: '400px'}}>
                          <dl className="uk-description-list uk-description-list-divider">
                            {/* <dt>Description term</dt>
                            <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</dd>
                            <dt>Description term</dt>
                            <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
                            <dt>Description term</dt>
                            <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd> */}
                          </dl>
                        </div>
                      </li>
                      <li className="uk-padding-small uk-padding-remove-vertical">
                        <a href="#">
                          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                            <div className="uk-width-expand">
                              <p className="uk-text-meta uk-margin-remove-top uk-text-lowercase">{ creds.user && creds.user.email }</p>
                            </div>
                            <div className="uk-width-auto">
                              <img className="uk-border-circle" alt="user" width="40" height="40" src={ require('../assets/img/profile-pic-placeholder.png') }/>
                            </div>
                          </div>
                        </a>

                        <div className="uk-navbar-dropdown">
                          <ul className="uk-nav uk-navbar-dropdown-nav">
                            <li className="uk-active"><Link to="/login">Logout</Link></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <main>{children}</main>
        <div className="ur-footer uk-padding uk-text-center">
          <small>Copyright © 2019 American Dominican. All rights reserved.</small>
        </div>
      </React.Fragment>
    );
  }
}

export default Dash;
