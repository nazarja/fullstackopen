import noteService from '../services/notes';

const noteReducer = (state = [], action) => {

	switch (action.type) {
		case 'NEW_NOTE':
			return [...state, action.data];
		case 'INIT_NOTES':
			return action.data;
		case 'TOGGLE_IMPORTANCE':
			const noteToChange = state.find(note => note.id === action.data.id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important
			};
			return state.map(note =>
				note.id !== action.data.id ? note : changedNote
			);
		default:
			return state;
	}
};

export const createNote = data => {
	return async dispatch => {
		const newNote = await noteService.createNew(data);
		dispatch({
			type: 'NEW_NOTE',
			data: newNote
		});
	}
};

export const initializeNotes = () => {
	return async dispatch => {
		const notes = await noteService.getAll()
		dispatch({
			type: 'INIT_NOTES',
			data: notes
		});
	}
};

export const toggleImportanceOf = id => {
	return {
		type: 'TOGGLE_IMPORTANCE',
		data: { id }
	};
};

export default noteReducer;
