import React, { useEffect, useState } from 'react'
import { Auth } from '../../layout'
import { Link } from 'react-router-dom'
import { setRegister } from '../../_services'
import { history } from '../../_helpers';


const Register = () => {
	const [username, updateUsername] = useState('')
	const [email, updateEmail] = useState('')
	const [password, updatePassword] = useState('')
	const [submitted, updateSubmitted] = useState(false)
	const [loading, updateLoading] = useState(false)

	useEffect(() => {
		if( submitted && ( !username || !email || !password ) ) updateLoading(false)
	})

	const handleSubmit = e => {
		e.preventDefault()
		updateSubmitted(true)
		updateLoading(true)
		if( username && email && password ) {
			setRegister({username, email, password}).then( res => {
				updateLoading(false)
				history.push('/login')
			})
		}
	}

	return (
		<Auth>
			<div className="uk-flex-1 uk-padding">
				<h1 className="uk-h2 uk-text-uppercase uk-text-bold uk-text-center uk-margin-t uk-margin-remove-bottom">Unicda requests</h1>
				<h3 className="uk-h6 uk-text-center uk-text-muted uk-margin-small-top">Please login to your account.</h3>
				<form className="ur-form-login uk-margin-auto" name="form-login" onSubmit={handleSubmit}>
					<div className="uk-margin">
						<div className="uk-inline uk-width-1-1">
							<span className="uk-form-icon" uk-icon="icon: user"></span>
							<input className={'uk-input uk-form-large' + (submitted && !username ? ' uk-form-danger' : '')} type="text" placeholder="Username" name="username" value={username} onChange={ (e) => updateUsername(e.target.value)} />
							{submitted && !username &&
                <div className="uk-text-danger uk-text-small">The user field is required</div>
           		}
						</div>
					</div>
					<div className="uk-margin">
						<div className="uk-inline uk-width-1-1">
							<span className="uk-form-icon" uk-icon="icon: mail"></span>
							<input className={'uk-input uk-form-large' + (submitted && !email ? ' uk-form-danger' : '')} type="text" placeholder="Email" name="email" value={email} onChange={ (e) => updateEmail(e.target.value)} />
							{submitted && !email &&
                <div className="uk-text-danger uk-text-small">The email field is required</div>
           		}
						</div>
					</div>
					<div className="uk-margin">
						<div className="uk-inline uk-width-1-1">
							<span className="uk-form-icon" uk-icon="icon: lock"></span>
							<input className={'uk-input uk-form-large' + (submitted && !password ? ' uk-form-danger' : '')} type="password" name="password" placeholder="Password" value={password} onChange={ (e) => updatePassword(e.target.value)} />
							{submitted && !password &&
								<div className="uk-text-danger uk-text-small">The password field is required.</div>
							}
						</div>
					</div>

					<div className="uk-margin-top">
					<button className="uk-button uk-button-primary uk-display-block uk-margin-auto uk-border-rounded">{ loading ? <div data-uk-spinner="ratio: 0.5"></div> : 'Register'}</button>
					</div>
 						<div className="uk-text-small uk-text-center uk-margin">
						 Do you already have an account? <Link to="/login">Login</Link>
						</div>
				</form>
				{/* <Link to="/privacy" className="uk-position-bottom-center">Term of use. Privacy policy</Link> */}
			</div>
    </Auth>
	)
}

export { Register }

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { userActions } from '../../_actions';
// import { Auth } from '../../layout';

// class Register extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 				user: {
// 						firstName: '',
// 						lastName: '',
// 						username: '',
// 						password: ''
// 				},
// 				submitted: false
// 		};

// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// }

// handleChange(event) {
// 		const { name, value } = event.target;
// 		const { user } = this.state;
// 		this.setState({
// 				user: {
// 						...user,
// 						[name]: value
// 				}
// 		});
// }

// handleSubmit(event) {
// 		event.preventDefault();

// 		this.setState({ submitted: true });
// 		const { user } = this.state;
// 		if (user.firstName && user.lastName && user.username && user.password) {
// 				this.props.register(user);
// 		}
// }

//   render() {
// 		const { registering } = this.props;
// 		const { user, submitted } = this.state;
				
//     return(
//       <Auth>
// 				<div className="uk-flex-1">
// 					<h1 className="uk-h2 uk-text-uppercase uk-text-bold uk-text-center uk-margin-t uk-margin-remove-bottom">Unicda requests</h1>
// 					<h3 className="uk-h6 uk-text-center uk-text-muted uk-margin-small-top">Please login to your account.</h3>
// 					<form className="ur-form-login uk-margin-auto" name="form-register" onSubmit={this.handleSubmit}>
// 						<div className="uk-margin">
// 							<div className="uk-inline uk-width-1-1">
// 								<span className="uk-form-icon" uk-icon="icon: mail"></span>
// 								<input className={'uk-input uk-form-large' + (submitted && !username ? ' uk-form-danger' : '')} type="text" placeholder="Username" name="username" value={username} onChange={this.handleChange}/>
// 								{submitted && !username &&
//                 	<div className="uk-text-danger uk-text-small">Username is required</div>
//            			}
// 							</div>
// 						</div>
// 						<div className="uk-margin">
// 							<div className="uk-inline uk-width-1-1">
// 								<span className="uk-form-icon" uk-icon="icon: lock"></span>
// 								<input className="uk-input uk-form-large" type="email" placeholder="Email" />
// 							</div>
// 						</div>
// 						<div className="uk-margin">
// 							<div className="uk-inline uk-width-1-1">
// 								<span className="uk-form-icon" uk-icon="icon: lock"></span>
// 								<input className="uk-input uk-form-large" type="password" placeholder="Password" />
// 							</div>
// 						</div>
// 						<div className="uk-margin-large-top">
// 							<div className="uk-inline uk-text-left uk-width-1-2@s">
// 								<label><input className="uk-checkbox" type="checkbox"/> Remember me</label>
// 							</div>
// 							<div className="uk-inline uk-text-right uk-width-1-2@s">
// 								<a href="#">Forgot Password</a>
// 							</div>
// 						</div>
// 						<div className="uk-margin-top">
// 							<button className="uk-button uk-button-primary uk-display-block uk-margin-auto uk-border-rounded">Login</button>
// 						</div>
// 						<div className="uk-text-small uk-text-center uk-margin">
// 							Not registered? <Link to="/register">Create an account</Link>
// 						</div>
// 					</form>
// 					<a href="#" className="uk-position-bottom-center">Term of use. Privacy policy</a>
// 				</div>
//       </Auth>
//     );
//   }
// }

// function mapState(state) {
// 	const { registering } = state.registration;
// 	return { registering };
// }

// const actionCreators = {
// 	register: userActions.register
// }

// const connectedRegisterPage = connect(mapState, actionCreators)(Register);
// export { connectedRegisterPage as Register };