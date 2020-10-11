const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const helper = require('./test_helper');
const Blog = require('../models/blogs');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Promise.all(helper.blogs.map(blog => new Blog(blog).save()));
});

describe('blogs are returned', () => {
    test('all blogs are returned in json format', async () => {
        const response = await api.get('/api/blogs');

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.length).toEqual(helper.blogs.length);
    });

    test('verify the unique identifier is named id', async () => {
        const response = await api.get('/api/blogs');
        response.body.forEach(blog => expect(blog.id).toBeDefined());
    });
});

describe('creating a blog', () => {
    test('successfully creates a new blog post', async () => {
        const blog = {
            title: 'A third blog title',
            author: 'Jacob Murphy',
            url: 'https://jacobmurphy.eu',
            likes: 15
        };

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(200);

        const blogs = await helper.blogsInDb();
        expect(blogs.length).toBe(helper.blogs.length + 1);

        const titles = blogs.map(blog => blog.title);
        expect(titles).toContain('A third blog title');
    });

    test('likes default to 0 if missing', async () => {
        const blog = {
            title: 'Missing Likes title',
            author: 'Jacob Murphy',
            url: 'https://jacobmurphy.eu'
        };

        const response = await api.post('/api/blogs').send(blog);
        expect(response.status).toBe(200);
        expect(response.body.likes).toBe(0);
    });

    test('if missing title or url, returns a bad request response', async () => {

        await Promise.all(helper.blogs.map(async (blog, i) => {
            if (i === 0) delete blog.title;
            else delete blog.url;
            await api
                .post('/api/blogs')
                .send(blog)
                .expect(400);
        }));

    });
});

describe('deleting a blog', () => {
    test('successfully deletes blog', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd.length).toBe(helper.blogs.length - 1);

        const contents = blogsAtEnd.map(blog => blog.content);
        expect(contents).not.toContain(blogToDelete.title);
    });
});

afterAll(() => mongoose.connection.close());