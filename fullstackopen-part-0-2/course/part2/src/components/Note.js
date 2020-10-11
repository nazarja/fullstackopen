import React from 'react';

const Note = ({ note, toggleImportance, removeNote }) => {
    const label = note.important
        ? 'make not important' : 'make important';

    return (
        <li className="note">
            {note.content}
            &nbsp;
            <button onClick={toggleImportance}>{label}</button>
            <button onClick={removeNote}>remove note</button>
        </li>
    )
}

export default Note;