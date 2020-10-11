import React from 'react';

const NoteForm = (props) => {
    return (
        <>
            <h2>Create New Note</h2>
            <form onSubmit={props.addNote}>
                <input type="text" value={props.newNote} onChange={props.handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </>
    );
};

export default NoteForm;