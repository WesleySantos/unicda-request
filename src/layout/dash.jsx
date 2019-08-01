import React from "react";
import { Link } from "react-router-dom"

class Dash extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="ur-header uk-visible@m uk-section-default">
          <div>
            <div className="uk-navbar-container uk-navbar-transparent">
              <div className="uk-container uk-container-expand">
                <nav data-uk-navbar="align:left; boundary:!.uk-navbar-container; dropbar:true; dropbar-anchor:!.uk-navbar-container; dropbar-mode:slide">
                  <div className="uk-navbar-left">
                    <Link to="/" className="uk-navbar-item uk-logo">Unidad requets</Link>
                  </div>
                  <div className="uk-navbar-center">
                    <ul className="uk-navbar-nav">
                      <li><Link to="/">Dashboard</Link></li>
                      <li><Link to="/requests">Requests</Link></li>
                      <li><Link to="/history">History</Link></li>
                      <li><Link to="/messages">Messages</Link></li>
                    </ul>
                  </div>
                  <div className="uk-navbar-right">
                    <ul className="uk-nav uk-navbar-item">
                      <li>
                        <div className="ur-notification">
                          <span className="uk-button uk-position-relative uk-padding-small uk-padding-remove-vertical" href="#" data-uk-icon="icon: bell">
                            <span className="uk-badge uk-position-absolute uk-position-z-index"></span>
                          </span>
                        </div>
                      </li>
                      <li className="uk-padding-small uk-padding-remove-vertical">
                        <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                          <div className="uk-width-expand">
                            <p className="uk-text-meta uk-margin-remove-top">Niurmiguel</p>
                          </div>
                          <div className="uk-width-auto">
                            <img className="uk-border-circle" alt="user" width="40" height="40" src="https://getuikit.com/docs/images/avatar.jpg"/>
                          </div>
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
          <small>Copyright © 2019 Dominico Americano. Todos los derechos reservados.</small>
        </div>
      </React.Fragment>
    );
  }
}

export default Dash;
