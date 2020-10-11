import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import blogService from '../services/blogService';
import { loginUser } from '../reducers/loginReducer';
import { Form, Button } from 'react-bootstrap';

let LoginForm = props => {

	const handleLogin = async event => {
		event.preventDefault();
		const form = { username: event.target.username.value, password: event.target.password.value};
		event.target.reset();	
		const user = await props.loginUser(form);
		if (user.username) setUserLocalStorage(user);
	};

	const setUserLocalStorage = user => {
		window.localStorage.setItem('blogListUser', JSON.stringify(user));
		blogService.setToken(user.token);
		props.history.push('/');
	};

	return (
		<>
			<h4 className="login-h">Login to the Application</h4>
			<Form onSubmit={handleLogin}>
				<Form.Label htmlFor="username">username</Form.Label>
				<Form.Control id="username" name="username" type="text" required/>
				<Form.Label htmlFor="password">password</Form.Label>
				<Form.Control id="password" name="password" type="password" required/>
				<Button id="login-btn" variant="primary" type="submit">Login</Button>
			</Form>
		</>
	);
};

const mapDispatchToProps = {
	loginUser
};

LoginForm = withRouter(LoginForm);
export default connect(null, mapDispatchToProps)(LoginForm);