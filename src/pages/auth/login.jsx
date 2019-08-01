import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Auth } from '../../layout'

import { userActions } from '../../_actions';

class Login extends Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.logout();

		this.state = {
			username: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		
		this.setState({ submitted: true });
		const { username, password } = this.state;
		if (username && password) {
			this.props.login(username, password);
		}
	}

  render() {
		const { loggingIn } = this.props;
		const { username, password, submitted } = this.state;
				
    return(
      <Auth>
				<div className="uk-flex-1 uk-padding">
					<h1 className="uk-h2 uk-text-uppercase uk-text-bold uk-text-center uk-margin-t uk-margin-remove-bottom">Unidad requets</h1>
					<h3 className="uk-h6 uk-text-center uk-text-muted uk-margin-small-top">Please login to your account.</h3>
					<form className="ur-form-login uk-margin-auto" name="form-login" onSubmit={this.handleSubmit}>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<span className="uk-form-icon" uk-icon="icon: mail"></span>
								<input className={'uk-input uk-form-large' + (submitted && !username ? ' uk-form-danger' : '')} type="text" placeholder="Username" name="username" value={username} onChange={this.handleChange}/>
								{submitted && !username &&
                	<div className="uk-text-danger uk-text-small">Username is required</div>
           			}
							</div>
						</div>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<span className="uk-form-icon" uk-icon="icon: lock"></span>
								<input className={'uk-input uk-form-large' + (submitted && !password ? ' uk-form-danger' : '')} type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
								{submitted && !password &&
									<div className="uk-text-danger uk-text-small">Password is required</div>
								}
							</div>
						</div>
						<div className="uk-margin-large-top">
							<div className="uk-inline uk-text-left uk-width-1-2@s">
								<label><input className="uk-checkbox" type="checkbox"/> Remember me</label>
							</div>
							<div className="uk-inline uk-text-right uk-width-1-2@s">
								<Link to="/forgot">Forgot Password</Link>
							</div>
						</div>
						<div className="uk-margin-top">
							<button className="uk-button uk-button-primary uk-display-block uk-margin-auto uk-border-rounded">Login</button>
							{loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
						</div>
						<div className="uk-text-small uk-text-center uk-margin">
							Not registered? <Link to="/register">Create an account</Link>
						</div>
					</form>
					<Link to="/privacy" className="uk-position-bottom-center">Term of use. Privacy policy</Link>
				</div>
      </Auth>
    );
  }
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };