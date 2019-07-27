import React from "react";

class Auth extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <main>{children}</main>
      </React.Fragment>
    );
  }
}

export default Auth;
