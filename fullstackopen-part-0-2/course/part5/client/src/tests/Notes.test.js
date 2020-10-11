import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Note from '../components/Note';

afterEach(cleanup);

test('renders content', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	};

	const component = render(< Note note={note} />);
	const li = component.container.querySelector('li');
	console.log(prettyDOM(li));

	// component.debug();

	// method 1
	expect(component.container).toHaveTextContent(
		'Component testing is done with react-testing-library'
	);

	// method 2
	const element = component.getByText(
		'Component testing is done with react-testing-library'
	);
	expect(element).toBeDefined();

	// method 3
	const div = component.container.querySelector('.note');
	expect(div).toHaveTextContent(
		'Component testing is done with react-testing-library'
	);
});

test('clicking the button calls the event handler', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	};

	const mockHandler = jest.fn();

	const { getByText } = render(
		<Note note={note} toggleImportance={mockHandler} />
	);

	const button = getByText('make not important');
	fireEvent.click(button);

	expect(mockHandler.mock.calls.length).toBe(1);
});