import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, password }) => {
	return (
		<>
			<h2>Log in to the Application</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="username">Username:</label>
					<input {...username} />
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input {...password} />
				</div>
				<button className="loginButton" type="submit">Log In</button>
			</form>
		</>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.object.isRequired,
	password: PropTypes.object.isRequired,
};

export default LoginForm;