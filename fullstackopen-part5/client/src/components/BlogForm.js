import React from 'react';
import { useField } from '../hooks';

const BlogForm = ({ createNewBlog }) => {
	const title = useField('title', 'text');
	const author = useField('author', 'text');
	const url = useField('url', 'url');

	const handleFormSubmit = (event) => {
		event.preventDefault();
		createNewBlog({
			title: title.value,
			author: author.value,
			url: url.value,
		});
		event.target.reset();
	};

	return (
		<>
			<h3>Create New Blog</h3>
			<form onSubmit={handleFormSubmit}>
				<div>
					<label htmlFor="title">Title:</label> &nbsp;
					<input {...title} />
				</div>
				<div>
					<label htmlFor="author">Author:</label> &nbsp;
					<input {...author} />
				</div>
				<div>
					<label htmlFor="url">Url:</label> &nbsp;
					<input {...url} />
				</div>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

export default BlogForm;


/*
==================
	Old Code
==================
*/
// const [form, setForm] = useState({
// 	title: '',
// 	author: '',
// 	url: ''
// });

// const handleInputChange = (key, value) => {
// 	setForm({ ...form, [key]: value });
// };

// const handleFormSubmit = (event) => {
// 	event.preventDefault();
// 	createNewBlog(form);
// 	event.target.reset();
// };
