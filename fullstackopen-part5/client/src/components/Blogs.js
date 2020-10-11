import React from 'react';

const Blogs = ({ blogs, user, increaseLike, removeBlog }) => {
	const toggleVisibility = (event) => {
		const blog = event.currentTarget.nextElementSibling;
		blog.style.display === 'none'
			? blog.style.display = 'block'
			: blog.style.display = 'none';
	};

	return (
		<div>
			<h3>Blogs List</h3>
			{
				blogs.map(blog =>
					<div className='blogItem' key={blog.id}>
						<p className="blogTitle" onClick={toggleVisibility}>Blog ({blog.likes}) : {blog.title} - <i>Author: {blog.author}</i></p>
						<div className="blogInfo" style={{ display: 'none' }}>
							<p>{blog.url}</p>
							<p><i>Likes:</i> {blog.likes} <button onClick={() => increaseLike(blog)}>Like</button></p>
							<p><i>Added by:</i> {blog.user.name}</p>
							{
								blog.user.username === user.username
									? <p><button className="redButton" onClick={() => removeBlog(blog)}>Delete</button></p>
									: null
							}
						</div>
					</div>
				)
			}
		</div>
	);
};

export default Blogs;