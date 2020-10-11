const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const helper = require('./test_helper');
const api = supertest(app);
const User = require('../models/users');


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({ username: 'root', password: 'secret', name: 'Superuser' });
        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'malakai',
            password: 'secret',
            name: 'malakai blue'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.name);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            password: 'secret',
            name: 'Superuser',
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
});