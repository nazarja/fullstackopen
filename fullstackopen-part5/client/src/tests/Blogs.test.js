import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blogs from '../components/Blogs';

afterEach(cleanup);

describe('<Blogs />', () => {
    let blogs;
    let user;
    let component;
    const mockHandler = jest.fn();

    beforeEach(() => {
        blogs = [
            {
                id: '5d5ad320240b4639a120401c',
                title: 'Another blog title',
                author: 'Jacob Murphy',
                likes: 5,
                user: {
                    username: 'Jacob',
                    name: 'Jacob Murphy'
                },
            }
        ];

        user = {
            username: 'Jacob',
            name: 'Jacob Murphy'
        }

        component = render(
            <Blogs
                blogs={blogs}
                user={user}
                increaseLike={mockHandler}
                removeBlog={mockHandler}
            />
        );
    });

    test('only author and title are visible initally', () => {
        const blogTitle = component.container.querySelector('.blogTitle');
        const blogInfo = component.container.querySelector('.blogInfo');

        expect(blogTitle).toBeDefined();
        expect(blogInfo).toBeDefined();

        expect(blogTitle).toHaveTextContent('Blog (5) : Another blog title - Author: Jacob Murphy')
        expect(blogInfo).toHaveStyle('display: none');
    });

    test('on click additional blog info is displayed', () => {
        const blogTitle = component.container.querySelector('.blogTitle');
        const blogInfo = component.container.querySelector('.blogInfo');
        fireEvent.click(blogTitle);
        expect(blogInfo).toHaveStyle('display: block');
    });
});