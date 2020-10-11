import React from 'react';

const Part = ({ parts }) => {
    const getParts = () => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>);

    return (
        <div>
            {getParts()}
        </div>
    );
};

export default Part;