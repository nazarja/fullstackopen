import React from 'react';

const Filter = ({ onChange, value }) => {
    return (
        <div>
            <label htmlFor="filter">Filter shown with:</label>
            <input id="filter" type="text" onChange={onChange} value={value} />
        </div>
    );
};

export default Filter;