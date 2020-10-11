const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        content: 'Cool Blog Title',
        date: '2019-06-11T16:38:15.541Z',
        author: 'Sean Murphy',
        likes: 12,
        user: {
            _id: '5a437a9e514ab7f158ddf138',
            username: 'Sean',
            name: 'Sean Murphy'
        }
    },
    {
        id: '5a451e21e0b8b04a45638211',
        title: 'Unbelievable  blog title',
        date: '2019-06-11T16:38:57.694Z',
        author: 'Jacob Murphy',
        likes: 50,
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'Jacob',
            name: 'Jacob Murphy'
        }
    },
    {
        id: '5a451e30b5ffd44a58fa79ab',
        title: 'Another blog title',
        date: '2019-06-11T16:39:12.713Z',
        author: 'Jacob Murphy',
        likes: 5,
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'Jacob',
            name: 'Jacob Murphy'
        }
    }
];

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    return Promise.resolve(blogs);
};

export default { getAll, setToken };