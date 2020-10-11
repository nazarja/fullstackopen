import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from '../components/SimpleBlog';

afterEach(cleanup);

describe('<SimpleBlog />', () => {
    let component;
    const mockHandler = jest.fn();

    beforeEach(() => {
        const blog = {
            title: 'A simple blog',
            author: 'Sean Murphy',
            likes: 0
        };
        const increaseLikes = () => blog.likes++;

        component = render(
            <SimpleBlog blog={blog} onClick={mockHandler} />
        );
    });

    test('component renders title, author, likes', () => {
        const authorTitle = component.container.querySelector('.title-author');
        const likes = component.container.querySelector('.likes');

        expect(authorTitle).toHaveTextContent(
            'A simple blog Sean Murphy'
        );
        expect(likes).toHaveTextContent('blog has 0 likes:')
    });

    test(' button of a component is pressed twice', () => {
        const button = component.container.querySelector('button');
        fireEvent.click(button);
        fireEvent.click(button);

        expect(mockHandler.mock.calls.length).toBe(2);
    });
});