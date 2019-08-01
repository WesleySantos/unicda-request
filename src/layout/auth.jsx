import React from "react";

class Auth extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle uk-section-default" data-uk-grid>
          <div className="uk-background-cover uk-visible@s" style={{ backgroundImage: "url(https://www.icda.edu.do:8081/assets/pages/img/login/bg2.jpg)" }} data-uk-height-viewport></div>
          <main className="uk-position-relative uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport="offset-bottom: 5">{children}</main>
        </div>
      </React.Fragment>
    );
  }
}

export default Auth;
