const { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes } = require('../utils/list_helpers');

const Blogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'A blog title',
        author: 'Murphy Sean',
        url: 'https://seanmurphy.eu',
        likes: 5
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'A blog title',
        author: 'Murphy Sean',
        url: 'https://seanmurphy.eu',
        likes: 10
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'A blog title',
        author: 'Sean Murphy',
        url: 'https://seanmurphy.eu',
        likes: 15
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'A blog title',
        author: 'Sean Murphy',
        url: 'https://seanmurphy.eu',
        likes: 20
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'A blog title',
        author: 'Sean Murphy',
        url: 'https://seanmurphy.eu',
        likes: 25
    }
];


describe('dummy', () => {
    test('dummy return one', () => {
        const blogs = [];
        const result = dummy(blogs);
        expect(result).toBe(1);
    });
});

describe('total likes', () => {
    test('of empty when list is zero', () => {
        const result = totalLikes([]);
        expect(result).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        const result = totalLikes([Blogs[0]]);
        expect(result).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(Blogs);
        expect(result).toBe(75);
    });
});

describe('favourite blog', () => {
    test('blog with most likes', () => {
        const result = favouriteBlog(Blogs);
        expect(result).toEqual({
            title: 'A blog title',
            author: 'Sean Murphy',
            likes: 25
        });
    });
});

describe('most blogs', () => {
    test('author with the most blogs', () => {
        const result = mostBlogs(Blogs);
        expect(result).toEqual({
            author: 'Sean Murphy',
            blogs: 3
        });
    });
});

describe('most likes', () => {
    test('author with the most likes and their like total', () => {
        const result = mostLikes(Blogs);
        expect(result).toEqual({
            author: 'Sean Murphy',
            likes: 60
        });
    });
});