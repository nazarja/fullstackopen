import React from 'react';
import { connect } from 'react-redux';
import { filterText } from '../reducers/filterReducer';

const Filter = (props) => {

    const filterAnecdotes = (value) => {
        props.filterText(value);
    };

    return (
        <div id="filter">
            <label htmlFor="filter">Filter:</label>
            <input type="text" name="filter" onChange={({target}) => filterAnecdotes(target.value)} />
        </div>
    )
};

export default connect(null, { filterText })(Filter);