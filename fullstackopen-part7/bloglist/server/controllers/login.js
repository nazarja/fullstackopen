const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/users');

loginRouter.route('/')
	.post(async (req, res, next) => {
		const user = await User.findOne({ username: req.body.username });
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(req.body.password, user.passwordHash);

		if (!(user && passwordCorrect)) {
			return res.status(401).json({ error: 'Invalid username or password' });
		}

		const userToken = { username: user.username, id: user._id };
		const token = jwt.sign(userToken, process.env.SECRET);
		return res
			.status(200)
			.send({ token, username: user.username, name: user.name });
	});

module.exports = loginRouter;