const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogs');
const User = require('../models/users');

blogsRouter.route('/')
	.get(async (req, res, next) => {
		try {
			const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
			return res.json(blogs.map(blog => blog.toJSON()));
		}
		catch (err) { next(err); }
	})
	.post(async (req, res, next) => {
		if (!req.token || !req.token.id) {
			console.log(req.token)
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		try {
			const user = await User.findOne({ _id: req.token.id });
			const blog = new Blog({
				title: req.body.title,
				author: req.body.author,
				url: req.body.url,
				likes: req.body.likes || 0,
				user: user._id,
				comments: []
			});

			let savedBlog = await blog.save();
			user.blogs = user.blogs.concat(savedBlog._id);
			await user.save();

			savedBlog = savedBlog.toJSON();
			savedBlog.user = { username: user.username, name: user.name };
			return res.json(savedBlog);
		}
		catch (err) { next(err); }
	});

blogsRouter.route('/:id')
	.get(async (req, res, next) => {
		try {
			const blog = Blog.findById(req.params.id);
			if (blog) return res.json(blog.toJSON());
			else return res.status(404).end();
		}
		catch (err) { next(err); }
	})
	.put(async (req, res, next) => {
		if (!req.token || !req.token.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		try {
			const blog = {
				title: req.body.title,
				author: req.body.author,
				url: req.body.url,
				likes: req.body.likes,
				comments: req.body.comments
			};

			let updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
			updatedBlog = updatedBlog.toJSON();

			const user = await User.findOne({ _id: updatedBlog.user });
			updatedBlog.user = { username: user.username, name: user.name };

			return res.json(updatedBlog);
		}
		catch (err) { next(err); }
	})
	.delete(async (req, res, next) => {

		if (!req.token || !req.token.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		try {
			const blog = await Blog.findById(req.params.id);

			if (String(blog.user) === req.token.id) {
				await Blog.findByIdAndRemove(req.params.id);
				await User.updateOne({ _id: req.token.id }, { $pull: { 'blogs': req.params.id } });
			}
			else return res.status(400).json({ error: 'delete not permitted by non owner' });

			return res.status(204).end();
		}
		catch (err) { next(err); }
	});

module.exports = blogsRouter;