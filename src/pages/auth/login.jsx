import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../../layout'
import { logout, setLogin } from '../../_services';
import { history } from '../../_helpers';

const Login = () => {
	const [username, updateUsername] = useState('')
	const [password, updatePassword] = useState('')
	const [submitted, updateSubmitted] = useState(false)
	const [loading, updateLoading] = useState(false)

	useEffect(() => {
		if( localStorage.getItem('user') ) {
			logout()
		}
	},[])
	
	useEffect(() => {
		if( submitted && ( !username || !password ) ) {
			updateLoading(false)
		}
	})


	const handleSubmit = e => {
		e.preventDefault()

		updateSubmitted(true)
		updateLoading(true)

		if( username && password ) {
			setLogin({username, password})
			.then( res => {
				localStorage.setItem('user', JSON.stringify(res))
				history.push('/')
			})
		}

	}

	return(
		<Auth>
			<div className="uk-flex-1 uk-padding">
				<h1 className="uk-h2 uk-text-uppercase uk-text-bold uk-text-center uk-margin-t uk-margin-remove-bottom">Unicda requests</h1>
				<h3 className="uk-h6 uk-text-center uk-text-muted uk-margin-small-top">Please login to your account.</h3>
				<form className="ur-form-login uk-margin-auto" name="form-login" onSubmit={handleSubmit}>
					<div className="uk-margin">
						<div className="uk-inline uk-width-1-1">
							<span className="uk-form-icon" uk-icon="icon: user"></span>
							<input className={'uk-input uk-form-large' + (submitted && !username ? ' uk-form-danger' : '')} type="text" placeholder="Username" name="username" value={username} onChange={ (e) => updateUsername(e.target.value)}/>
							{submitted && !username &&
                	<div className="uk-text-danger uk-text-small">Username is required</div>
           			}
							</div>
						</div>
						<div className="uk-margin">
							<div className="uk-inline uk-width-1-1">
								<span className="uk-form-icon" uk-icon="icon: lock"></span>
								<input className={'uk-input uk-form-large' + (submitted && !password ? ' uk-form-danger' : '')} type="password" name="password" placeholder="Password" value={password} onChange={ (e) => updatePassword(e.target.value)} />
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
							<button className="uk-button uk-button-primary uk-display-block uk-margin-auto uk-border-rounded">{ loading ? <div data-uk-spinner="ratio: 0.5"></div> : 'Login'}</button>
						</div>
						<div className="uk-text-small uk-text-center uk-margin">
							Not registered? <Link to="/register">Create an account</Link>
						</div>
					</form>
					{/* <Link to="/privacy" className="uk-position-bottom-center">Term of use. Privacy policy</Link> */}
				</div>
      </Auth>
	)
}

export { Login }