import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, waitForElement } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);
jest.mock('../services/notes');

/*
==========================
 Simulate Local Storage
==========================
*/
let savedItems = {};

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item;
    },
    getItem: (key) => savedItems[key],
    clear: () => {
        savedItems = {};
    }
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

/*
==========================
 Integration Tests
==========================
*/
describe('<App />', () => {
    test('renders all notes it gets from backend', async () => {
        const component = render(
            <App />
        );
        component.rerender(<App />);

        await waitForElement(
            () => component.container.querySelector('.note')
        );

        const notes = component.container.querySelectorAll('.note');
        expect(notes.length).toBe(3);

        expect(component.container).toHaveTextContent(
            'HTML is easy'
        );
        expect(component.container).toHaveTextContent(
            'Browser can execute only javascript'
        );
        expect(component.container).toHaveTextContent(
            'The most important methods of HTTP are GET and POST'
        );
    });
});