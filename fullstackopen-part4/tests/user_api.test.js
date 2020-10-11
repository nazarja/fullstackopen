const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const helper = require('./test_helper');
const User = require('../models/users');
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    await Promise.all(helper.users.map(user => new User(user).save()));
});

describe('user creation', () => {
    test('user is successfully created', async () => {
        const usersAtStart = await helper.usersInDb();

        const user = {
            username: 'charley',
            password: 'orange',
            name: 'charley orange'
        };

        await api
            .post('/api/users')
            .send(user)
            .expect(200);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(user.username);
    });

    test('no duplicate users created', async () => {
        const usersAtStart = await helper.usersInDb();

        const user = {
            username: 'sean',
            password: 'secret',
            name: 'sean murphy'
        };

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
        expect(response.body.error).toContain('`username` to be unique');
    });

    test('username and password length is greater than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb();

        const users = [
            {
                username: 'se',
                password: 'secret',
                name: 'sean murphy'
            },
            {
                username: 'sean M',
                password: 'se',
                name: 'sean murphy'
            }
        ];

        await Promise.all(users.map(async (user, i) => {
            const response = await api
                .post('/api/users')
                .send(user)
                .expect(400);

            i === 0
                ? expect(response.body.error).toContain('`username` (`se`) is shorter than the minimum')
                : expect(response.body.error).toContain('password length must be greater than 3 characters');
        }));
    });
});

afterAll(() => mongoose.connection.close());