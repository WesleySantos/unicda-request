import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Auth } from '../../layout';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
				user: {
						firstName: '',
						lastName: '',
						username: '',
						password: ''
				},
				submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
				user: {
						...user,
						[name]: value
				}
		});
}

handleSubmit(event) {
		event.preventDefault();

		this.setState({ submitted: true });
		const { user } = this.state;
		if (user.firstName && user.lastName && user.username && user.password) {
				this.props.register(user);
		}
}

  render() {
		const { registering  } = this.props;
		const { user, submitted } = this.state;
				
    return(
      <Auth>
				<div className="uk-flex-1">
					<h1 className="uk-h2 uk-text-uppercase uk-text-bold uk-text-center uk-margin-t uk-margin-remove-bottom">Unidad requets</h1>
					<h3 className="uk-h6 uk-text-center uk-text-muted uk-margin-small-top">Please login to your account.</h3>
					<form className="ur-form-login uk-margin-auto" name="form-register" onSubmit={this.handleSubmit}>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<span className="uk-form-icon" uk-icon="icon: mail"></span>
								<input className="uk-input uk-form-large" type="text" placeholder="Username"/>
							</div>
						</div>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<span className="uk-form-icon" uk-icon="icon: lock"></span>
								<input className="uk-input uk-form-large" type="password" placeholder="Password" />
							</div>
						</div>
						<div className="uk-margin-large-top">
							<div className="uk-inline uk-text-left uk-width-1-2@s">
								<label><input className="uk-checkbox" type="checkbox"/> Remember me</label>
							</div>
							<div className="uk-inline uk-text-right uk-width-1-2@s">
								<a href="#">Forgot Password</a>
							</div>
						</div>
						<div className="uk-margin-top">
							<button className="uk-button uk-button-primary uk-display-block uk-margin-auto uk-border-rounded">Login</button>
						</div>
						<div className="uk-text-small uk-text-center uk-margin">
							Not registered? <Link to="/register">Create an account</Link>
						</div>
					</form>
					<a href="#" className="uk-position-bottom-center">Term of use. Privacy policy</a>
				</div>
      </Auth>
    );
  }
}

function mapState(state) {
	const { registering } = state.registration;
	return { registering };
}

const actionCreators = {
	register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };