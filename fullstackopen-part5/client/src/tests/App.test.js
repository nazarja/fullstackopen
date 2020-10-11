import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);
jest.mock('../services/blogs');


describe('<App />', () => {
    test('if no user logged in, notes are not rendered', async () => {
        const component = render(<App />);
        await waitForElement(() => component.getByText('Log In'));

        const loginButton = component.container.querySelector('.loginButton');
        expect(loginButton).toBeDefined();

        const blogs = component.container.querySelectorAll('.blogItem');
        expect(blogs.length).toBe(0);
    });

    test('login is ok and blogs are displayed', async () => {
        const user = {
            username: 'Sean',
            token: '1231231214',
            name: 'Sean Murph'
        };

        localStorage.setItem('loggedInUser', JSON.stringify(user));

        const component = render(<App />);

        try {
            await waitForElement(() => component.getByText('Log In'));
        }
        catch (err) {
            console.log(err)
        }
        finally {
            await waitForElement(() => component.getByText('Blogs List'));
            const blogs = document.querySelectorAll('.blogItem');
            expect(blogs.length).toBe(3)
        }
    });
});