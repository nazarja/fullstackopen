const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

userRouter.route('/')
	.get(async (req, res, next) => {
		try {
			const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
			return res.json(users.map(user => user.toJSON()));
		} catch (err) { next(err); }
	})
	.post(async (req, res, next) => {
		if (req.body.password.length < 3)
			return next({ name: 'InvalidCharacterLength', message: 'password length must be greater than 3 characters' });

		try {
			const salt = 10;
			const passwordHash = await bcrypt.hash(req.body.password, salt);

			const user = new User({
				username: req.body.username,
				passwordHash: passwordHash,
				name: req.body.name
			});

			const savedUser = await user.save();
			return res.json(savedUser.toJSON());
		} catch (err) { next(err); }
	});

module.exports = userRouter;