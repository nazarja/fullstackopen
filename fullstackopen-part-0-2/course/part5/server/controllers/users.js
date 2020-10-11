const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/users');

usersRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.find({}).populate('notes', { content: 1, date: 1 });
            return res.json(users.map(user => user.toJSON()));
        }
        catch (err) { next(err); }
    })
    .post(async (req, res, next) => {
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
        }
        catch (err) { next(err); }
    });

module.exports = usersRouter;