import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogsService from './services/blogs';
import loginService from './services/login';
import { useField } from './hooks';


const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const username = useField('username', 'text');
	const password = useField('password', 'password');
	const [notification, setNotification] = useState(null);
	const newBlogRef = React.createRef();

	useEffect(() => {
		blogsService
			.getAll()
			.then(blogs => setBlogs([...blogs].sort((a, b) => (a.likes < b.likes) ? 1 : -1)));
	}, []);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem('loggedInUser');
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			blogsService.setToken(user.token);
			setUser(user);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username: username.value, password: password.value });
			blogsService.setToken(user.token);
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			setUser(user);
		}
		catch (err) {
			setNotification({ message: 'Invalid Username or Password', type: 'error' });
			setTimeout(() => setNotification(null), 3000);
		}
	};

	const handleLogout = () => {
		window.localStorage.clear();
		blogsService.setToken(null);
		setUser(null);
	};

	const createNewBlog = form => {
		newBlogRef.current.toggleVisibility();

		blogsService
			.create(form)
			.then(blog => {
				setBlogs([...blogs, blog]);
				setNotification({ message: `New Blog Added: ${blog.title} by ${blog.user.username}`, type: 'success' });
				setTimeout(() => setNotification(null), 3000);
			})
			.catch(err => handleError(err));
	};

	const removeBlog = obj => {
		if (window.confirm(`Remove blog ${obj.title} by ${obj.author}`)) {
			blogsService
				.remove(obj.id)
				.then(() => setBlogs(blogs.filter(blog => blog.id !== obj.id)))
				.catch(err => handleError(err));
		}
	};

	const increaseLike = obj => {
		blogsService
			.like(obj)
			.then(likedBlog => {
				setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog));
			})
			.catch(err => handleError(err));
	};

	const handleError = err => {
		setNotification({ message: err.message, type: 'error' });
		setTimeout(() => setNotification(null), 3000);
	};

	return (
		<div className="App">
			<Notification notification={notification} />
			<h1>Blogs Application</h1>
			{
				user === null
					?
					<LoginForm
						handleLogin={handleLogin}
						username={username}
						password={password}
					/>
					: (
						<>
							<h3>{user.username} logged in - <button onClick={handleLogout}>Logout</button></h3>
							<Togglable label='Create New Blog' ref={newBlogRef}>
								<BlogForm createNewBlog={createNewBlog} />
							</Togglable>
							<Blogs blogs={blogs} user={user} increaseLike={increaseLike} removeBlog={removeBlog} />
						</>
					)
			}
		</div>
	);
};

export default App;
