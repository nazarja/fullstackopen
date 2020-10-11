// eslint-disable-next-line no-unused-vars
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

let savedItems = {};

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item;
    },
    getItem: (key) => savedItems[key],
    clear: savedItems = {}
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});