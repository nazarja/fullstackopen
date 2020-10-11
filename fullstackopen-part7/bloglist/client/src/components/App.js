import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { initialiseBlogs } from '../reducers/blogReducer';
import { initialiseUsers } from '../reducers/usersReducer';
import { setUser } from '../reducers/loginReducer';
import blogService from '../services/blogService';
import Notification from './Notification';
import LoginForm from './LoginForm';
import Heading from './Heading';
import Menu from './Menu';
import Blog from './Blog';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import Users from './Users';
import User from './User';
import { Container } from 'react-bootstrap';

const App = props => {

	useEffect(() => {
		props.initialiseBlogs();
		props.initialiseUsers();
	}, [props]);

	useEffect(() => {
		const userJSON = window.localStorage.getItem('blogListUser');
        if (userJSON) {
            const user = JSON.parse(userJSON);
			props.setUser(user);
			blogService.setToken(user.token);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<Container>
			<BrowserRouter>
				<Notification />
				<Heading text="Blogs Application" type="h1" />
				{
					props.user
						? (
							<>
								<Menu />
								<Route path="/login" render={() => <LoginForm />} />
								<Route exact path="/" render={() => <BlogList />} />
								<Route path="/blogs/:id" render={({match}) => <Blog blog={match.params.id}/> } />
								<Route path="/create" render={() => <BlogForm />} />
								<Route exact path="/users" render={() => <Users />} />
								<Route path="/users/:id" render={({match}) => <User user={match.params.id}/>} />
							</>
						)
						: <LoginForm />
				}
			</BrowserRouter>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	}
};

const mapDispatchToProps = {
	initialiseBlogs,
	initialiseUsers,
	setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
