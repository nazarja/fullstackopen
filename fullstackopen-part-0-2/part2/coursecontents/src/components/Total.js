import React from 'react';

const Total = ({ parts }) => {
    const total = parts.reduce((sum, { exercises }) => sum + exercises, 0);

    return (
        <p>
            <strong>total of {total} exercises</strong>
        </p>
    );
};

export default Total;