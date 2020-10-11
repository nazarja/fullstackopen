import React from 'react';

const NoteForm = ({ onSubmit, handleChange, value }) => {
    return (
        <div>
            <h2>Luo uusi muistiinpano</h2>

            <form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={handleChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

const Wrapper = (props) => {

    const onChange = (event) => {
        props.state.value = event.target.value;
    };

    return (
        <NoteForm
            value={props.state.value}
            onSubmit={props.onSubmit}
            handleChange={onChange}
        />
    );
};

export default Wrapper;
