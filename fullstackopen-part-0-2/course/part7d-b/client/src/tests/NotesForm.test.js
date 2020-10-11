import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Wrapper from '../components/NoteFormTest';

afterEach(cleanup);

test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn();
    const state = {
        value: ''
    };

    const component = render(
        <Wrapper onSubmit={onSubmit} state={state} />
    );

    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, { target: { value: 'testing of forms could be easier' } });
    fireEvent.submit(form);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(state.value).toBe('testing of forms could be easier');
});
