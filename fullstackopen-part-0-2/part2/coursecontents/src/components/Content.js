import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({ parts }) => {
    return (
        <div>
            <Part parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default Content;