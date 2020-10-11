const testRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');

testRouter.post('/reset', async(req, res) => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    res.status(200).end();
});

module.exports = testRouter;