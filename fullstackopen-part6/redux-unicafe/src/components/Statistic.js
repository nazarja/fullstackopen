import React from 'react';

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text.slice(0, 1).toUpperCase() + text.slice(1)}:</td>
            <td>{value}</td>
        </tr>
    );
};

export default Statistic;