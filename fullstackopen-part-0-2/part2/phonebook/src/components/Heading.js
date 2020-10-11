import React from 'react';

const Heading = ({ type, text }) => {
    return type === 'h2' ? <h2>{text}</h2> : <h3>{text}</h3>;
};

export default Heading;