import React from 'react';

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" onChange={handleNameChange} value={newName} required />
            </div>
            <div>
                <label htmlFor="number">Number: </label>
                <input id="number" type="text" onChange={handleNumberChange} value={newNumber} required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;