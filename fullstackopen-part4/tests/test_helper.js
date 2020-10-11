const Blog = require('../models/blogs');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const blogs = [
    {
        title: 'A first blog title',
        author: 'Sean Murphy',
        url: 'https://seanmurphy.eu',
        likes: 5
    },
    {
        title: 'A second blog title',
        author: 'Jacob Murphy',
        url: 'https://jacobmurphy.com',
        likes: 10
    }
];

const users = [
    {
        username: 'jacob',
        passwordHash: 'supercool',
        name: 'jacob murphy'
    },
    {
        username: 'sean',
        passwordHash: 'secret',
        name: 'sean murphy'
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = { blogs, blogsInDb, users, usersInDb };