import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer';

const App = (props) => {

    useEffect(() => {
        props.initializeNotes();
    }, [props]);

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    );
};

export default connect(null, { initializeNotes })(App);